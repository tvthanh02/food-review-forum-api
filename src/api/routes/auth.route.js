const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { checkLogin } = require('../middlewares/auth.middleware');

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
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const { data, message, error } = await AuthController.login(email, password);

  if (error) {
    res.status(500).json({
      message,
    });
    res.end();
  }

  res.status(200).json(data);
});

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
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const { data, message, error } = await AuthController.register(
    email,
    password
  );

  if (error) {
    res.status(500).json({
      message,
    });
    res.end();
  }

  res.status(200).json(data);
});

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
router.post('/logout', checkLogin, async (req, res) => {
  const { accessToken, refreshToken } = req.body;
  const { message, error } = await AuthController.logout(
    accessToken,
    refreshToken
  );
  if (error) {
    res.status(500).json({
      message,
    });
    res.end();
  }

  res.status(200).json({
    message: 'logged out',
  });
});

module.exports = router;
