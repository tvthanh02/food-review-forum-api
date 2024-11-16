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
 *                data:
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Post'
 *                    meta:
 *                      $ref: '#/components/schemas/Meta'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async (req, res) => {
  const { data, message, error } = await PostController.getAllPosts(req.query);
  if (error) HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
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
  const { data, message, error } = await PostController.getDetailPost(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  if (!data) return HttpResponseHandler.NotFound(res);
  HttpResponseHandler.Success(res, data, message);
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
 *            $ref: '#/components/schemas/Post'
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Post'
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
    const { data, message, error } = await PostController.createPost(req.body);
    if (error) return HttpResponseHandler.InternalServerError(res, message);
    HttpResponseHandler.Success(res, data);
  }
);

/**
 * @openapi
 * /api/v1/post/update/{id}:
 *  patch:
 *    tags:
 *      - Post
 *    operationId: updatePost
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
 *              $ref: '#/components/schemas/Post'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch('/update/:id', checkLogin, (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = PostController.updatePost(id, req.body);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/post/delete/{id}:
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
 *                _id:
 *                  type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/delete/:id', checkLogin, (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = PostController.deletePost(id);
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
