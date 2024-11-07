const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/response-handler.helper');
const UserController = require('../controllers/user.controller');
const { checkLogin, checkAdmin } = require('../middlewares/auth.middleware');

/**
 * @openapi
 * /api/v1/user:
 *  get:
 *    tags:
 *      - User
 *    operationId: getAll
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *          required: false
 *        example: 1
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 20
 *          required: false
 *        example: 20
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Profile'
 *                   meta:
 *                     $ref: '#/components/schemas/Meta'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/', async (req, res) => {
  const { data, message, error } = await UserController.getAllUsers(req.query);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/user/{id}:
 *  get:
 *    tags:
 *      - User
 *    operationId: getDetailUser
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
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
router.get('/:id', checkLogin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await UserController.getDetailUser(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  if (!data) return HttpResponseHandler.NotFound(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/user/update/{id}:
 *  patch:
 *    tags:
 *      - User
 *    operationId: update
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              avatar:
 *                type: string
 *              user_name:
 *                type: string
 *              social_links:
 *                type: array
 *                items:
 *                  type: string
 *              bio:
 *                type: string
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Profile'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch('/update/:id', checkLogin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await UserController.updateUser(
    id,
    req.body
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/user/delete/{id}:
 *  delete:
 *    tags:
 *      - User
 *    operationId: delete
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/delete/:id', checkAdmin, (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = UserController.deleteUser(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
