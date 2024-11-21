const express = require('express');
const router = express.Router();
const HttpResponseHandler = require('../helpers/response-handler.helper');
const PostController = require('../controllers/post.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');

/**
 * @openapi
 * /api/v1/post:
 *  get:
 *    tags:
 *      - Post
 *    operationId: getAllPost
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
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: get all posts successfully
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Post'
 *                  meta:
 *                    $ref: '#/components/schemas/Meta'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async (req, res) => {
  const { data, message, errors, status, meta } =
    await PostController.getAllPosts(req.query);
  if (errors) HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status, meta);
});

/**
 * @openapi
 * /api/v1/post/{id}:
 *  get:
 *    tags:
 *      - Post
 *    operationId: getDetailPost
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
 *                  example: get detail post successfully
 *                data:
 *                  $ref: '#/components/schemas/Post'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await PostController.getDetailPost(id);
  if (errors) {
    if (errors.status === 404)
      return HttpResponseHandler.NotFound(res, errors, status);
    return HttpResponseHandler.InternalServerError(res, errors, status);
  }
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/post/create:
 *  post:
 *    tags:
 *      - Post
 *    operationId: createPost
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostBody'
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
 *                  example: create post successfully
 *                data:
 *                  $ref: '#/components/schemas/Post'
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
  checkBadRequest([
    'position',
    'food_name',
    'province',
    'maps',
    'description',
    'images',
    'videos',
    'thumbnail',
    'categories',
    'user_id',
  ]),
  async (req, res) => {
    const { data, message, errors, status } = await PostController.createPost(
      req.body
    );
    if (errors)
      return HttpResponseHandler.InternalServerError(res, errors, status);
    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/post/{id}/update:
 *  patch:
 *    tags:
 *      - Post
 *    operationId: updatePost
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostBody'
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
 *                  example: update post successfully
 *                data:
 *                  $ref: '#/components/schemas/Post'
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
  const { data, message, errors, status } = await PostController.updatePost(
    id,
    req.body
  );
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/post/{id}/delete:
 *  delete:
 *    tags:
 *      - Post
 *    operationId: deletePost
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
 *                  example: delete post successfully
 *                data:
 *                  type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/:id/delete', checkLogin, async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } = await PostController.deletePost(id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
