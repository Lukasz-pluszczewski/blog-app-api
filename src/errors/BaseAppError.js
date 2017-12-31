export default class BaseAppError extends Error {
  constructor(type, message, details, code, originalError) {
    super(message);
    this.type = type;
    this.message = message;
    this.details = details;
    this.code = code;
    this.originalError = originalError;
  }
}