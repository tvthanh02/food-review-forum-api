const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env.local' });
const process = require('node:process');
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
 *       '500':
 *        description: Internal Server Error
 */
router.post(
  '/login',
  checkBadRequest(['email', 'password']),
  async (req, res) => {
    const { email, password } = req.body;
    const { data, message, error } = await AuthController.login(
      email,
      password
    );

    if (error) {
      return HttpResponseHandler.InternalServerError(res, message);
    }

    HttpResponseHandler.Success(res, data);
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
 *              $ref: '#/components/schemas/ResponseRegister'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.post(
  '/register',
  checkBadRequest(['email', 'password']),
  async (req, res) => {
    const { email, password } = req.body;
    const { data, message, error } = await AuthController.register(
      email,
      password
    );

    if (error) {
      return HttpResponseHandler.InternalServerError(res, message);
    }

    HttpResponseHandler.Success(res, data);
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
 *                message:
 *                  type: string
 *                  example: logged out
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
 *               data:
 *                  $ref: '#/components/schemas/Profile'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/profile', checkLogin, async (req, res) => {
  const { authorization: accessToken } = req.headers;
  const { uid } = jwt.verify(accessToken, process.env.SECRET_KEY);
  const { data, message, error } = await UserController.getDetailUser(uid);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
