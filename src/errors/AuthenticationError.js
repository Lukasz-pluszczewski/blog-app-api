import BaseAppError from './BaseAppError';
import { AUTHENTICATION } from '../constants/errorTypes';

export default class AuthenticationError extends BaseAppError {
  constructor(details, originalError) {
    super(AUTHENTICATION.type, AUTHENTICATION.message, details, AUTHENTICATION.code, originalError);
  }
}