import BaseError from "./BaseError";

export default class ValidationError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
    this.code = 400;
  }

  toResponseObject() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
