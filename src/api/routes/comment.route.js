const express = require('express');
const router = express.Router();
const CommentController = require('../controllers/comment.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');

require('dotenv').config();

/**
 * @openapi
 * /api/v1/comment/create:
 *  post:
 *    tags:
 *      - Comment
 *    operationId: commentInsert
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - content
 *              - post_id
 *            properties:
 *              content:
 *                type: string
 *              post_id:
 *                type: string
 *              parent_id:
 *                type: string
 *              reply_to_user_id:
 *                type: string
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *              videos:
 *                type: array
 *                items:
 *                  type: string
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
 *                  example: Comment created successfully
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Comment'
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 *    security:
 *      - bearerAuth: []
 */
router.post(
  '/create',
  checkLogin,
  checkBadRequest(['content']),
  async (req, res) => {
    const userId = req.payload.uid;
    const { data, message, errors, status } =
      await CommentController.createComment({
        ...req.body,
        user_id: userId,
      });
    if (errors) {
      return HttpResponseHandler.InternalServerError(res, errors, status);
    }
    return HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/comment/{postId}:
 *  get:
 *    tags:
 *      - Comment
 *    operationId: getCommentByPostId
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
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
 *                 example: get comments successfully
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Comment'
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.get('/:postId', async (req, res) => {
  if (!req.params.postId) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CommentController.getCommentByPostId(req.params.postId);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/comment/{id}/reply:
 *  get:
 *    tags:
 *      - Comment
 *    operationId: getReplyByCommentId
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
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
 *                 example: get comments successfully
 *               data:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Comment'
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.get('/:id/reply', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CommentController.getReplyByCommentId(id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/comment/{id}/update:
 *  patch:
 *    tags:
 *      - Comment
 *    operationId: updateComment
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *              images:
 *                type: array
 *                items:
 *                  type: string
 *              videos:
 *                type: array
 *                items:
 *                  type: string
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
 *                 example: update comment successfully
 *               data:
 *                 $ref: '#/components/schemas/Comment'
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.patch('/:id/update', checkLogin, async (req, res) => {
  if (!req.params.id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CommentController.updateComment(req.params.id, req.body);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/comment/{id}/delete:
 *  delete:
 *    tags:
 *      - Comment
 *    operationId: deleteComment
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
 *                 example: delete comment successfully
 *               data:
 *                 type: string
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.delete('/:id/delete', checkLogin, async (req, res) => {
  if (!req.params.id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await CommentController.deleteComment(req.params.id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
