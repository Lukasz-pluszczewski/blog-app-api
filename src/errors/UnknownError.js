import BaseAppError from './BaseAppError';
import { UNKNOWN } from '../constants/errorTypes';

export default class NotFoundError extends BaseAppError {
  constructor(details, originalError) {
    super(UNKNOWN.type, UNKNOWN.message, details, UNKNOWN.code, originalError);
  }
}
