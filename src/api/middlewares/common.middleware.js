const HttpResponseHandler = require('../helpers/http-response-handler.helper');
const checkBadRequest = (fieldNames = []) => {
  return (req, res, next) => {
    if (
      fieldNames.some((fieldName) => !{ ...req.body, ...req.files }[fieldName])
    ) {
      HttpResponseHandler.BadRequest(res, 'Bad Request');
      return;
    }
    next();
  };
};

const checkMulterError = (err, _, res, next) => {
  if (err) {
    return HttpResponseHandler.InternalServerError(res, err.message);
  }
  next();
};

module.exports = {
  checkBadRequest,
  checkMulterError,
};
