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
 *              required:
 *                - content
 *                - post_id
 *              properties:
 *               content:
 *                 type: string
 *               post_id:
 *                 type: string
 *               parent_id:
 *                 type: string
 *               reply_to_user_id:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               videos:
 *                 type: array
 *                 items:
 *                   type: string
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
    const { data, message, error } = await CommentController.createComment({
      ...req.body,
      user_id: userId,
    });
    if (error) {
      return HttpResponseHandler.InternalServerError(res, message);
    }
    return HttpResponseHandler.Success(res, data);
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
  const { data, message, error } = await CommentController.getCommentByPostId(
    req.params.postId
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
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
  const { data, message, error } =
    await CommentController.getReplyByCommentId(id);
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  HttpResponseHandler.Success(res, data);
});

/**
 * @openapi
 * /api/v1/comment/update/{id}:
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
 *              $ref: '#/components/schemas/Comment'
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.patch('/update/:id', checkLogin, async (req, res) => {
  if (!req.params.id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await CommentController.updateComment(
    req.params.id,
    req.body
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/comment/delete/{id}:
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
 *               data:
 *                 type: string
 *        '400':
 *          description: BadRequest
 *        '500':
 *          description: InternalServerError
 */
router.delete('/delete/:id', checkLogin, async (req, res) => {
  if (!req.params.id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await CommentController.deleteComment(
    req.params.id
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

module.exports = router;
