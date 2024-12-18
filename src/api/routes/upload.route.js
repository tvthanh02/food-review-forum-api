const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const upload = require('../../config/multer.config');
const HttpResponseHandler = require('../helpers/response-handler.helper');
const { checkMulterError } = require('../middlewares/common.middleware');

/**
 * @openapi
 * /api/v1/upload:
 *  post:
 *    tags:
 *      - Upload
 *    operationId: upload
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - file
 *            properties:
 *              file:
 *                type: file
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
 *                  example: uploaded
 *                data:
 *                  type: string
 *       '500':
 *        description: Internal Server Error
 */
router.post('/upload', upload.single('file'), checkMulterError, (req, res) => {
  const { file } = req;
  if (!file)
    return HttpResponseHandler.BadRequest(
      res,
      {
        status: 500,
        title: 'Internal Server Error',
        detail: 'Internal Server Error',
        source: 'controller/upload',
      },
      'error'
    );
  const paths = uploadController.uploadSingle(file);
  HttpResponseHandler.Success(res, paths, 'uploaded', 'success');
});

/**
 * @openapi
 * /api/v1/upload-multiple:
 *  post:
 *    tags:
 *      - Upload
 *    operationId: uploadMultiple
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *              - files
 *            properties:
 *              files:
 *                type: array
 *                items:
 *                  type: file
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
 *                  example: uploaded
 *                data:
 *                  type: array
 *                  items:
 *                    type: string
 *       '500':
 *        description: Internal Server Error
 */
router.post(
  '/upload-multiple',
  upload.array('files'),
  checkMulterError,
  (req, res) => {
    const { files } = req;
    if (!files)
      return HttpResponseHandler.BadRequest(
        res,
        {
          status: 500,
          title: 'Internal Server Error',
          detail: 'Internal Server Error',
          source: 'controller/upload',
        },
        'error'
      );
    const data = uploadController.uploadMultiple(files);
    HttpResponseHandler.Success(res, data, 'uploaded', 'success');
  }
);

module.exports = router;
