import { UNKNOWN } from "../constants/errorTypes";

const UnknownErrorsHandler = (error, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  if (process.env.NODE_ENV === 'development') {
    return res.status(UNKNOWN.code).json({
      message: UNKNOWN.message,
      originalError: {
        message: error.message,
        stack: error.stack,
        stackSplit: error.stack && error.stack.split('\n'),
        ...error,
      },
    });
  }
  res.status(UNKNOWN.code).json({ message: UNKNOWN.message });
};

export default UnknownErrorsHandler;