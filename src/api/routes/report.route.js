const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');
const {
  checkLogin,
  isAdmin,
  hasRole,
} = require('../middlewares/auth.middleware');
const { checkBadRequest } = require('../middlewares/common.middleware');
const HttpResponseHandler = require('../helpers/response-handler.helper');

/**
 * @openapi
 * /api/v1/report:
 *  get:
 *    tags:
 *      - Report
 *    operationId: getAllReports
 *    description: Get all report
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
 *          enum: ['Pending', 'Resolved', 'Closed']
 *          required: false
 *      - in: query
 *        name: report_type_id
 *        schema:
 *          type: string
 *          required: false
 *      - in: query
 *        name: user_id
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
 *                  example: get all report
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/ResponseReport'
 *                meta:
 *                  $ref: '#/components/schemas/Meta'
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/', checkLogin, isAdmin, async (req, res) => {
  const { data, message, errors, status, meta } =
    await ReportController.getAllReports(req.query);
  if (errors) return HttpResponseHandler.BadRequest(res, errors, status);
  return HttpResponseHandler.Success(res, data, message, status, meta);
});

/**
 * @openapi
 * /api/v1/report/create:
 *  post:
 *    tags:
 *      - Report
 *    operationId: createReport
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - post_id
 *              - report_type_id
 *            properties:
 *              post_id:
 *                type: string
 *              report_type_id:
 *                type: array
 *                items:
 *                  type: string
 *              note:
 *                type: string
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
 *                  example: create report successfully
 *                data:
 *                  schema:
 *                    $ref: '#/components/schemas/ResponseReport'
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
  checkBadRequest(['post_id', 'report_type_id']),
  async (req, res) => {
    const { data, message, errors, status } =
      await ReportController.createReport({
        ...req.body,
        uid: req.payload.uid,
      });
    if (errors) return HttpResponseHandler.BadRequest(res, errors, status);
    return HttpResponseHandler.Success(res, data, message, status);
  }
);

/**
 * @openapi
 * /api/v1/report/{id}/status:
 *  patch:
 *    tags:
 *      - Report
 *    operationId: updateReportStatus
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                enum: ['Pending', 'Resolved', 'Closed']
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
 *                  example: update report status successfully
 *                data:
 *                  schema:
 *                    $ref: '#/components/schemas/ResponseReport'
 *       '400':
 *        description: Bad Request
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.patch(
  '/:id/status',
  checkLogin,
  hasRole(['admin', 'subadmin']),
  checkBadRequest(['status']),
  async (req, res) => {
    const { id } = req.params;
    const { data, message, errors, status } =
      await ReportController.updateReportStatus(id, req.body.status);
    if (errors) return HttpResponseHandler.BadRequest(res, errors, status);
    return HttpResponseHandler.Success(res, data, message, status);
  }
);

module.exports = router;
