const KnownErrorsHandler = (error, req, res, next) => {
  if (error.code) {
    if (process.env.NODE_ENV === 'development') {
      return res.status(error.code).json({
        message: error.message,
        details: error.details,
        originalError: {
          message: error.message,
          stack: error.stack,
          stackSplit: error.stack && error.stack.split('\n'),
          ...error,
        },
      });
    }
    return res.status(error.code).json({ message: error.message, details: error.details });
  }
  next(error);
};

export default KnownErrorsHandler;