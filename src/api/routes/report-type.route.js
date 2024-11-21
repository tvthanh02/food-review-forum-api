const express = require('express');
const router = express.Router();
const ReportTypeController = require('../controllers/report-type.controller');
const { isAdmin, checkLogin } = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');

/**
 * @openapi
 * /api/v1/report-type:
 *  get:
 *    tags:
 *      - Report Type
 *    operationId: getAllReportTypes
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *          default: 1
 *          required: false
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 20
 *          required: false
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
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: get all report types
 *                data:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      status:
 *                        type: string
 *                meta:
 *                  $ref: '#/components/schemas/Meta'
 *       '500':
 *        description: Internal Server Error
 */
router.get('/', async (req, res) => {
  const { data, message, errors, status, meta } =
    await ReportTypeController.getAllReportTypes(req.query);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  return HttpResponseHandler.Success(res, data, message, status, meta);
});

/**
 * @openapi
 * /api/v1/report-type/{id}:
 *  get:
 *    tags:
 *      - Report Type
 *    operationId: getReportTypeDetail
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
 *                  example: get report type detail
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    status:
 *                      type: string
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 */
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await ReportTypeController.getReportTypeDetail(id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  return HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/report-type/create:
 *  post:
 *    tags:
 *      - Report Type
 *    operationId: createReportType
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - name
 *              - status
 *            properties:
 *              name:
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
 *                  example: create report type
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    status:
 *                      type: string
 *       '403':
 *        description: Forbidden
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
  checkBadRequest(['name', 'status']),
  async (req, res) => {
    if (['Active', 'Inactive'].indexOf(req.body.status) === -1)
      return HttpResponseHandler.BadRequest(
        res,
        "Status must be 'Active' or 'Inactive'"
      );
    const { data, message, errors, status } =
      await ReportTypeController.createReportType(req.body);
    if (errors)
      return HttpResponseHandler.InternalServerError(res, errors, status);
    return HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/report-type/{id}/update:
 *  patch:
 *    tags:
 *      - Report Type
 *    operationId: updateReportType
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
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
 *                data:
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
 *                      type: string
 *                    status:
 *                      type: string
 *       '403':
 *        description: Forbidden
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch('/:id/update', checkLogin, isAdmin, async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return HttpResponseHandler.BadRequest(res);
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, errors, status } =
    await ReportTypeController.updateReportType(id, req.body);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  return HttpResponseHandler.Success(res, data, message, status);
});

/**
 * @openapi
 * /api/v1/report-type/{id}/delete:
 *  delete:
 *    tags:
 *      - Report Type
 *    operationId: deleteReportType
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
 *                  example: delete report type
 *                data:
 *                  type: string
 *       '403':
 *        description: Forbidden
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
  const { data, message, errors, status } =
    await ReportTypeController.deleteReportType(id);
  if (errors)
    return HttpResponseHandler.InternalServerError(res, errors, status);
  return HttpResponseHandler.Success(res, data, message, status);
});

module.exports = router;
