const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');
const { checkLogin, isAdmin } = require('../middlewares/auth.middleware');
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
 *                    $ref: '#/components/schemas/ResponseReport'
 *                meta:
 *                  $ref: '#/components/schemas/Meta'
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/', checkLogin, isAdmin, async (req, res) => {
  const { data, message, error } = await ReportController.getAllReports(
    req.query
  );
  if (error) return HttpResponseHandler.BadRequest(res, message);
  return HttpResponseHandler.Success(res, data);
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
 *                type: string
 *    responses:
 *       '200':
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseReport'
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
    const { data, message, error } = await ReportController.createReport(
      req.body
    );
    if (error) return HttpResponseHandler.BadRequest(res, message);
    return HttpResponseHandler.Success(res, data);
  }
);

module.exports = router;
