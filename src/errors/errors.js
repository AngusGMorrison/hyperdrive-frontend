export class ServerError extends Error {
  constructor(code) {
    super();
    this.name = "ServerError";
    this.code = code;
  }
}