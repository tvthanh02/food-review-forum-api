class HttpResponseHandler {
  static BadRequest(res, message = 'Bad Request') {
    res.status(400).json({
      error: 1,
      message,
    });
    return;
  }

  static Unauthorized(res, message = 'Unauthorized') {
    res.status(401).json({
      error: 1,
      message,
    });
    return;
  }

  static Forbidden(res, message = 'Forbidden') {
    res.status(403).json({
      error: 1,
      message,
    });
    return;
  }

  static NotFound(res, message = 'Not Found') {
    res.status(404).json({
      error: 1,
      message,
    });
    return;
  }

  static InternalServerError(res, message = 'Internal Server Error') {
    res.status(500).json({
      error: 1,
      message,
    });
    return;
  }

  static Success(res, data = null, message = 'Success') {
    res.status(200).json({
      error: 0,
      message,
      data,
    });
  }
}

module.exports = HttpResponseHandler;
