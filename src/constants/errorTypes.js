export const UNKNOWN = {
  type: 'UNKNOWN',
  fatal: false,
  message: 'Internal server error',
  code: 500,
};

export const INITIALIZATION_FATAL = {
  type: 'INITIALIZATION_FATAL',
  fatal: true,
  message: 'Internal server error',
  code: 500,
};

export const AUTHORIZATION = {
  type: 'AUTHORIZATION',
  fatal: false,
  message: 'Authorization error',
  code: 401,
};

export const AUTHENTICATION = {
  type: 'AUTHENTICATION',
  fatal: false,
  message: 'Authentication error',
  code: 401,
};

export const NOT_FOUND = {
  type: 'NOT_FOUND',
  fatal: false,
  message: 'Not found',
  code: 404,
};

export const BAD_REQUEST = {
  type: 'BAD_REQUEST',
  fatal: false,
  message: 'Bad request',
  code: 400,
};
