const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');
require('dotenv').config();
const UserController = require('../controllers/user.controller');

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    operationId: login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RequestBodyLogin'
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseLogin'
 *       '400':
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseErrorBadRequest'
 *       '500':
 *        description: Internal Server Error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseErrorInternalServer'
 */
router.post(
  '/login',
  checkBadRequest(['email', 'password']),
  async (req, res) => {
    const { email, password } = req.body;
    const { data, message, errors, status } = await AuthController.login(
      email,
      password
    );

    if (errors) {
      if (errors.status === 404)
        return HttpResponseHandler.NotFound(res, errors, status);
      return HttpResponseHandler.InternalServerError(res, errors);
    }

    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/auth/register:
 *  post:
 *    tags:
 *      - Auth
 *    operationId: register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/RequestBodyLogin'
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: registered
 *                data:
 *                  $ref: '#/components/schemas/UserInfo'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.post(
  '/register',
  checkBadRequest(['user_name', 'email', 'password']),
  async (req, res) => {
    const { email, password, user_name } = req.body;
    const { data, message, errors, status } = await AuthController.register(
      email,
      password,
      user_name
    );

    if (errors) {
      return HttpResponseHandler.InternalServerError(res, errors, status);
    }

    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/auth/logout:
 *  post:
 *    tags:
 *      - Auth
 *    operationId: logout
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              accessToken:
 *                type: string
 *              refreshToken:
 *                type: string
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: logged out
 *                data:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *                    refreshToken:
 *                      type: string
 *       '401':
 *        description: Unauthorized
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/logout',
  checkLogin,
  checkBadRequest(['accessToken', 'refreshToken']),
  async (req, res) => {
    const { accessToken, refreshToken } = req.body;
    const { message, error } = await AuthController.logout(
      accessToken,
      refreshToken
    );
    if (error) {
      return HttpResponseHandler.InternalServerError(res, message);
    }

    res.status(200).json({
      data: null,
      message: 'logged out',
    });
  }
);

/**
 * @openapi
 * /api/v1/auth/profile:
 *  get:
 *    tags:
 *      - Auth
 *    operationId: getProfile
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: get profile successfully
 *                data:
 *                  $ref: '#/components/schemas/Profile'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/profile', checkLogin, async (req, res) => {
  const { data, message, error } = await UserController.getDetailUser(
    req.payload.uid
  );
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  HttpResponseHandler.Success(res, data);
});

/**
 * @openapi
 * /api/v1/auth/refresh-token:
 *  post:
 *    tags:
 *      - Auth
 *    operationId: refreshToken
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              refreshToken:
 *                type: string
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: refreshed
 *                data:
 *                  type: object
 *                  properties:
 *                    accessToken:
 *                      type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.post(
  '/refresh-token',
  checkBadRequest(['refreshToken']),
  async (req, res) => {
    const { refreshToken } = req.body;
    const { data, message, error } = await AuthController.refresh(refreshToken);
    if (error) return HttpResponseHandler.InternalServerError(res, message);
    HttpResponseHandler.Success(res, data, message);
  }
);

module.exports = router;
