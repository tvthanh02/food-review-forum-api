const HttpResponseHandler = require('../helpers/response-handler.helper');
const checkBadRequest = (fieldNames = []) => {
  return (req, res, next) => {
    const missingFields = fieldNames.filter(
      (fieldName) => !req.body[fieldName]
    );

    if (missingFields.length > 0) {
      return HttpResponseHandler.BadRequest(
        res,
        `Missing required fields: ${missingFields.join(', ')}`
      );
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
