export default class BaseError extends Error {
  constructor(message) {
    super(message);
    this.isCustom = true;
  }
}
