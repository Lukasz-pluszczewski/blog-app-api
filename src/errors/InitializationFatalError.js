import BaseAppError from './BaseAppError';
import { INITIALIZATION_FATAL } from '../constants/errorTypes';

export default class InitializationError extends BaseAppError {
  constructor(details, originalError) {
    super(INITIALIZATION_FATAL.type, INITIALIZATION_FATAL.message, details, INITIALIZATION_FATAL.code, originalError);
  }
}