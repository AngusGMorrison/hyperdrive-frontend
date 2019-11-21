export class ServerError extends Error {
  constructor(code, details = {}) {
    super();
    this.name = "ServerError";
    this.code = code;
    this.details = details;
  }
}