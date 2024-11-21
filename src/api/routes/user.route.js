const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/response-handler.helper');
const UserController = require('../controllers/user.controller');
const {
  checkLogin,
  isAdmin,
  hasRole,
} = require('../middlewares/auth.middleware');

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
 *      - in: query
 *        name: role
 *        schema:
 *          type: string
 *          required: false
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *          required: false
 *      - in: query
 *        name: email
 *        schema:
 *          type: string
 *          required: false
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
 *                   status:
 *                     type: string
 *                     example: success
 *                   message:
 *                     type: string
 *                     example: get all users successfully
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
  const { data, message, errors, status, meta } =
    await UserController.getAllUsers(req.query);
  if (errors)
    return HttpResponseHandler.InternalServerError(res.errors, status);
  HttpResponseHandler.Success(res, data, message, status, meta);
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
 *               status:
 *                 type: string
 *                 example: success
 *               message:
 *                 type: string
 *                 example: get user detail successfully
 *               data:
 *                  $ref: '#/components/schemas/Profile'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await UserController.getDetailUser(id);
  if (errors) {
    if (errors.status === 404)
      return HttpResponseHandler.NotFound(res, errors, status);
    return HttpResponseHandler.InternalServerError(res, errors, status);
  }
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/user/{id}/update:
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
 *              type: object
 *              properties:
 *               status:
 *                 type: string
 *                 example: success
 *               message:
 *                 type: string
 *                 example: update user successfully
 *               data:
 *                 schema:
 *                    $ref: '#/components/schemas/Profile'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch('/:id/update', checkLogin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } = await UserController.updateUser(
    id,
    req.body
  );
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/user/{id}/ban:
 *  post:
 *    tags:
 *      - User
 *    operationId: ban
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
 *               status:
 *                 type: string
 *                 example: success
 *               message:
 *                 type: string
 *                 example: ban user successfully
 *               data:
 *                 type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch(
  '/:id/ban',
  checkLogin,
  hasRole(['admin', 'subadmin']),
  async (req, res) => {
    const { id } = req.params;
    if (!id)
      return HttpResponseHandler.BadRequest(
        res,
        {
          status: 400,
          message: 'Bad Request',
          errors: 'Missing id',
          source: 'controller',
        },
        'error'
      );
    const { data, message, errors, status } = await UserController.banUser(id);
    if (errors)
      return HttpResponseHandler.InternalServerError(res, errors, status);
    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/user/{id}/delete:
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
 *               status:
 *                 type: string
 *                 example: success
 *               message:
 *                 type: string
 *                 example: delete user successfully
 *               data:
 *                 type: string
 *                 example: 673f785f6ab18a000c41d455
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/:id/delete', checkLogin, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } = await UserController.deleteUser(id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
