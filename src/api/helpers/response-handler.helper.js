class HttpResponseHandler {
  static BadRequest(res, message = 'Bad Request') {
    return res.status(400).json({
      error: 1,
      message,
    });
  }

  static Unauthorized(res, message = 'Unauthorized') {
    return res.status(401).json({
      error: 1,
      message,
    });
  }

  static Forbidden(res, message = 'Forbidden') {
    return res.status(403).json({
      error: 1,
      message,
    });
  }

  static NotFound(res, message = 'Not Found') {
    return res.status(404).json({
      error: 1,
      message,
    });
  }

  static InternalServerError(res, message = 'Internal Server Error') {
    return res.status(500).json({
      error: 1,
      message,
    });
  }

  static Success(res, data = null, message = 'Success') {
    return res.status(200).json({
      error: 0,
      message,
      data,
    });
  }
}

module.exports = HttpResponseHandler;
