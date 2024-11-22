const express = require('express');
const { checkLogin } = require('../middlewares/auth.middleware');
const router = express.Router();
const HttpResponseHandler = require('../helpers/response-handler.helper');
const WishlistController = require('../controllers/wishlist.controller');
const { checkBadRequest } = require('../middlewares/common.middleware');

/**
 * @openapi
 * /api/v1/wishlist:
 *  get:
 *    tags:
 *      - Wishlist
 *    operationId: getWishlistByUserId
 *    description: Get wishlist by current user
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
 *                  example: get wishlist successfully
 *                status:
 *                  type: string
 *                  example: success
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Post'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/', checkLogin, async (req, res) => {
  const { data, message, errors, status, meta } =
    await WishlistController.getWishlistByUserId(req.payload.uid, req.query);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status, meta);
});

/**
 * @openapi
 * /api/v1/wishlist/create:
 *  post:
 *    tags:
 *      - Wishlist
 *    operationId: createWishlist
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - post_id
 *            properties:
 *              post_id:
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
 *                  example: create wishlist successfully
 *                status:
 *                  type: string
 *                  example: success
 *                data:
 *                  type: string
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
  checkBadRequest(['post_id']),
  async (req, res) => {
    const { data, message, errors, status } =
      await WishlistController.createWishlist({
        ...req.body,
        user_id: req.payload.uid,
      });
    if (errors)
      return HttpResponseHandler.InternalServerError(res, errors, status);
    HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/wishlist/{id}/delete:
 *  delete:
 *    tags:
 *      - Wishlist
 *    operationId: deleteWishlist
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
 *                message:
 *                  type: string
 *                  example: delete wishlist successfully
 *                status:
 *                  type: string
 *                  example: success
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
  const { data, message, errors, status } =
    await WishlistController.deleteWishlist(id, req.payload.uid);
  if (errors) {
    if (errors.status === 403)
      return HttpResponseHandler.Forbidden(res, errors, status);
    return HttpResponseHandler.InternalServerError(res, errors, status);
  }
  HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/wishlist/clear:
 *  delete:
 *    tags:
 *      - Wishlist
 *    operationId: clearWishlist
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
 *                data:
 *                  type: string
 *                message:
 *                  type: string
 *                  example: clear wishlist successfully
 *       '403':
 *        description: Forbidden
 *       '401':
 *        description: Unauthorized
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/clear', checkLogin, async (req, res) => {
  const { data, message, errors, status } =
    await WishlistController.clearWishlist(req.payload.uid);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
