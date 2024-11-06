const HttpResponseHandler = require('../helpers/http-response-handler.helper');
const checkBadRequest = (fieldNames = []) => {
  return (req, res, next) => {
    if (fieldNames.some((fieldName) => !req.body[fieldName])) {
      return HttpResponseHandler.BadRequest(res, 'Bad Request');
    }
    next();
  };
};

module.exports = {
  checkBadRequest,
};
