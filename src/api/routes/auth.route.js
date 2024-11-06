const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

/**
 * @openapi
 * /api/v1/auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    operationId: login
 *    requestBody:
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

router.post('/logout', (req, res) => {
  res.json({ message: 'logout' });
});

module.exports = router;
