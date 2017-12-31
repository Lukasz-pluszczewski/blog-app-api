import _ from 'lodash';

/**
 * Returns function that translates error object to response
 * @param {response} res -  express Response object
 * @param {number} defaultStatus - default error http status code
 * @param {string} defaultError - default error message
 * @return {function} function that sends error response
 */
export function errorToRes(res, defaultStatus = 500, defaultError = 'Internal server error') {
  /**
   * Sends error response with data from err object
   * @param {object} err - error with code and message fields
   * @return {res} res
   */
  return err => {
    if (_.isString(err)) {
      return res.status(defaultStatus).json({ message: err || defaultError });
    }
    return res.status(err.code || defaultStatus).json({ message: err.message || defaultError });
  };
}
