const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/http-response-handler.helper');
const CategoryController = require('../controllers/category.controller');
const { checkLogin, checkAdmin } = require('../middlewares/auth.middleware');
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
 *                       $ref: '#/components/schemas/Category'
 *                   meta:
 *                     $ref: '#/components/schemas/Meta'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async (req, res) => {
  const { data, message, error } = await CategoryController.getAllCategories(
    req.query
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/category/{id}:
 *  get:
 *    tags:
 *      - Category
 *    operationId: categoryGetDetail
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               data:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *        description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } =
    await CategoryController.getDetailCategory(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/category/create:
 *  post:
 *    tags:
 *      - Category
 *    operationId: categoryCreate
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
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.post('/create', checkBadRequest(['category_name']), async (req, res) => {
  const { data, message, error } = await CategoryController.createCategory(
    req.body
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/category/update/{id}:
 *  patch:
 *    tags:
 *      - Category
 *    operationId: categoryUpdate
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
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Category'
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
  const { data, message, error } = await CategoryController.updateCategory(
    id,
    req.body
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/category/delete/{id}:
 *  delete:
 *    tags:
 *      - Category
 *    operationId: categoryDelete
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
  const { data, message, error } = CategoryController.deleteCategory(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
