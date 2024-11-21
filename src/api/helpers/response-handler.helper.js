class HttpResponseHandler {
  static BadRequest(
    res,
    errors = {
      status: 400,
      title: 'Bad Request',
      detail: 'Bad Request',
      source: 'controller',
    },
    status = 'error'
  ) {
    return res.status(400).json({
      status,
      errors,
    });
  }

  static Unauthorized(
    res,
    errors = {
      status: 401,
      title: 'Unauthorized',
      detail: 'Unauthorized',
      source: 'controller',
    },
    status = 'error'
  ) {
    return res.status(401).json({
      status,
      errors,
    });
  }

  static Forbidden(
    res,
    errors = {
      status: 403,
      title: 'Forbidden',
      detail: 'Forbidden',
      source: 'controller',
    },
    status = 'error'
  ) {
    return res.status(403).json({
      status,
      errors,
    });
  }

  static NotFound(
    res,
    errors = {
      status: 404,
      title: 'Not Found',
      detail: 'Not Found',
      source: 'controller',
    },
    status = 'error'
  ) {
    return res.status(404).json({
      status,
      errors,
    });
  }

  static InternalServerError(
    res,
    errors = {
      status: 500,
      title: 'Internal Server Error',
      detail: 'Internal Server Error',
      source: 'controller',
    },
    status = 'error'
  ) {
    return res.status(500).json({
      status,
      errors,
    });
  }

  static Success(
    res,
    data = null,
    message = 'Success',
    status = 'success',
    meta = null
  ) {
    if (!meta) {
      return res.status(200).json({
        status,
        message,
        data,
      });
    }
    return res.status(200).json({
      status,
      message,
      data,
      meta,
    });
  }
}

module.exports = HttpResponseHandler;
