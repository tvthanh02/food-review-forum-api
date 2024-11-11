const express = require('express');
const router = express.Router();
const RateController = require('../controllers/rate.controller');
const { checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');
require('dotenv').config();

/**
 * @openapi
 * /api/v1/rate/{postId}:
 *  get:
 *    tags:
 *      - Rate
 *    operationId: getRateByPostId
 *    parameters:
 *      - in: path
 *        name: postId
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
 *                  type: object
 *                  properties:
 *                    data:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          _id:
 *                            type: string
 *                          rate:
 *                            type: number
 *                          post_id:
 *                            type: string
 *                            format: ObjectId
 *                          user_id:
 *                            type: string
 *                            format: ObjectId
 *                          user_info:
 *                            type: object
 *                            properties:
 *                              user_name:
 *                                type: string
 *                              avatar:
 *                                type: string
 *                              email:
 *                                type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/:postId', async (req, res) => {
  if (!req.params.postId) {
    return HttpResponseHandler.BadRequest(res);
  }
  const { data, message, error } = await RateController.getRateByPostId(
    req.params.postId
  );
  if (error) return HttpResponseHandler.InternalServerError(res);
  HttpResponseHandler.Success(res, data, message);
});

/**
 * @openapi
 * /api/v1/rate/create:
 *  post:
 *    tags:
 *      - Rate
 *    operationId: createRate
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - rate
 *              - post_id
 *            properties:
 *              rate:
 *                type: number
 *              post_id:
 *                type: string
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Rate'
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
  checkBadRequest(['rate', 'post_id']),
  async (req, res) => {
    const { rate, post_id } = req.body;
    const uid = req.payload.uid;
    const { data, message, error } = await RateController.createRate(
      rate,
      post_id,
      uid
    );
    if (error) return HttpResponseHandler.InternalServerError(res);
    HttpResponseHandler.Success(res, data, message);
  }
);

module.exports = router;
