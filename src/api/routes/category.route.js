const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/response-handler.helper');
const CategoryController = require('../controllers/category.controller');
const { checkLogin, isAdmin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');

/**
 * @openapi
 * /api/v1/category:
 *  get:
 *    tags:
 *      - Category
 *    operationId: categoryGetAll
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
 *        name: status
 *        schema:
 *          type: string
 *          enum: ['Active', 'Inactive']
 *          required: false
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
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
 *                 example: get all categories successfully
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Category'
 *               meta:
 *                 $ref: '#/components/schemas/Meta'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async (req, res) => {
  const { data, message, errors, status, meta } =
    await CategoryController.getAllCategories(req.query);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status, meta);
});

/**
 * @openapi
 * /api/v1/category/{id}:
 *  get:
 *    tags:
 *      - Category
 *    operationId: categoryGetDetail
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
 *                 example: get detail category successfully
 *               data:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/:id', checkLogin, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CategoryController.getDetailCategory(id);
  if (errors) {
    if (errors.status === 404)
      return HttpResponseHandler.NotFound(res, errors, status);
    return HttpResponseHandler.InternalServerError(res, errors, status);
  }
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/category/create:
 *  post:
 *    tags:
 *      - Category
 *    operationId: categoryCreate
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - category_name
 *              - status
 *            properties:
 *              category_name:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *                enum: ['Active', 'Inactive']
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
 *                  example: create category successfully
 *                data:
 *                  $ref: '#/components/schemas/Category'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/create',
  checkLogin,
  isAdmin,
  checkBadRequest(['category_name', 'status']),
  async (req, res) => {
    const { data, message, errors, status } =
      await CategoryController.createCategory(req.body);
    if (errors)
      return HttpResponseHandler.InternalServerError(res, errors, status);
    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/category/{id}/update:
 *  patch:
 *    tags:
 *      - Category
 *    operationId: categoryUpdate
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
 *              category_name:
 *                type: string
 *              description:
 *                type: string
 *              status:
 *                type: string
 *                enum: ['Active', 'Inactive']
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
 *                  example: update category successfully
 *                data:
 *                  $ref: '#/components/schemas/Category'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch('/:id/update', checkLogin, isAdmin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  Object.entries(req.body).some(
    // eslint-disable-next-line no-unused-vars
    ([key, _]) => !['category_name', 'description', 'status'].includes(key)
  ) && HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CategoryController.updateCategory(id, req.body);
  if (errors) {
    if (errors.status === 404)
      return HttpResponseHandler.NotFound(res, errors, status);
    return HttpResponseHandler.InternalServerError(res, errors, status);
  }
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/category/{id}/delete:
 *  delete:
 *    tags:
 *      - Category
 *    operationId: categoryDelete
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
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: delete category successfully
 *                data:
 *                  type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/:id/delete', checkLogin, isAdmin, async (req, res) => {
  const { id } = req.params;
  console.log('delete run');
  if (!id)
    return HttpResponseHandler.BadRequest(
      res,
      {
        status: 400,
        title: 'Bad Request',
        detail: 'id is required',
        source: 'controller',
      },
      'error'
    );
  const { data, message, errors, status } =
    await CategoryController.deleteCategory(id);

  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
