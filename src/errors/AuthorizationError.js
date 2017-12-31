import BaseAppError from './BaseAppError';
import { AUTHORIZATION } from '../constants/errorTypes';

export default class AuthenticationError extends BaseAppError {
  constructor(details, originalError) {
    super(AUTHORIZATION.type, AUTHORIZATION.message, details, AUTHORIZATION.code, originalError);
  }
}