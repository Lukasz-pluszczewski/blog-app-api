import BaseAppError from './BaseAppError';
import { NOT_FOUND } from '../constants/errorTypes';

export default class NotFoundError extends BaseAppError {
  constructor(details, originalError) {
    super(NOT_FOUND.type, NOT_FOUND.message, details, NOT_FOUND.code, originalError);
  }
}
