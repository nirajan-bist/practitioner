import BaseError from "./BaseError";

export default class TokenError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "TokenError";
    this.code = 401;
  }

  toResponseObject() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
