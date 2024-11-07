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
  const { data, message, error } = await WishlistController.getWishlistByUserId(
    req.payload.uid
  );
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  HttpResponseHandler.Success(res, data);
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
    const { data, message, error } = await WishlistController.createWishlist({
      ...req.body,
      user_id: req.payload.uid,
    });
    if (error) return HttpResponseHandler.InternalServerError(res, message);
    HttpResponseHandler.Success(res, data);
  }
);

/**
 * @openapi
 * /api/v1/wishlist/delete/{id}:
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
 *                data:
 *                  type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/delete/:id', checkLogin, async (req, res) => {
  const { id } = req.params;
  const { data, message, error, hasPermission } =
    await WishlistController.deleteWishlist(id, req.payload.uid);
  if (hasPermission) return HttpResponseHandler.Forbidden(res, message);
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  HttpResponseHandler.Success(res, data);
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
 *                data:
 *                  type: string
 *                message:
 *                  type: string
 *       '403':
 *        description: Forbidden
 *       '401':
 *        description: Unauthorized
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.delete('/clear', checkLogin, async (req, res) => {
  const { data, message, error } = await WishlistController.clearWishlist(
    req.payload.uid
  );
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  HttpResponseHandler.Success(res, data);
});

module.exports = router;
