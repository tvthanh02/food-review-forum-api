class HttpResponseHandler {
  static BadRequest(res, message = 'Bad Request') {
    return res
      .status(400)
      .json({
        error: 1,
        message,
      })
      .end();
  }

  static Unauthorized(res, message = 'Unauthorized') {
    return res
      .status(401)
      .json({
        error: 1,
        message,
      })
      .end();
  }

  static Forbidden(res, message = 'Forbidden') {
    return res
      .status(403)
      .json({
        error: 1,
        message,
      })
      .end();
  }

  static NotFound(res, message = 'Not Found') {
    return res
      .status(404)
      .json({
        error: 1,
        message,
      })
      .end();
  }

  static InternalServerError(res, message = 'Internal Server Error') {
    return res
      .status(500)
      .json({
        error: 1,
        message,
      })
      .end();
  }

  static Success(res, data = null, message = 'Success') {
    return res
      .status(200)
      .json({
        error: 0,
        message,
        data,
      })
      .end();
  }
}

module.exports = HttpResponseHandler;
