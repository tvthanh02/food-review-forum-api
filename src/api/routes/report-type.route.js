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
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      name:
 *                        type: string
 *       '403':
 *        description: Forbidden
 *       '500':
 *        description: Internal Server Error
 *    security:
 *      - bearerAuth: []
 */
router.get('/', checkLogin, isAdmin, async (req, res) => {
  const { data, message, error } = await ReportTypeController.getAllReportTypes(
    req.query
  );
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  return HttpResponseHandler.Success(res, data);
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
 *            properties:
 *              name:
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
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
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
    const { data, message, error } =
      await ReportTypeController.createReportType(req.body);
    if (error) return HttpResponseHandler.InternalServerError(res, message);
    return HttpResponseHandler.Success(res, data);
  }
);

/**
 * @openapi
 * /api/v1/report-type/update/{id}:
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
 *            required:
 *              - name
 *            properties:
 *              name:
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
 *                  type: object
 *                  properties:
 *                    _id:
 *                      type: string
 *                    name:
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
router.patch('/update/:id', checkLogin, isAdmin, async (req, res) => {
  if (Object.keys(req.body).length === 0)
    return HttpResponseHandler.BadRequest(res);
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = await ReportTypeController.updateReportType(
    id,
    req.body
  );
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  return HttpResponseHandler.Success(res, data);
});

/**
 * @openapi
 * /api/v1/report-type/delete/{id}:
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
router.delete('/delete/:id', checkLogin, isAdmin, (req, res) => {
  const { id } = req.params;
  if (!id) return HttpResponseHandler.BadRequest(res);
  const { data, message, error } = ReportTypeController.deleteReportType(id);
  if (error) return HttpResponseHandler.InternalServerError(res, message);
  return HttpResponseHandler.Success(res, data);
});

module.exports = router;
