import BaseAppError from './BaseAppError';
import { BAD_REQUEST } from '../constants/errorTypes';

export default class BadRequestError extends BaseAppError {
  constructor(details, originalError) {
    super(BAD_REQUEST.type, BAD_REQUEST.message, details, BAD_REQUEST.code, originalError);
  }
}
