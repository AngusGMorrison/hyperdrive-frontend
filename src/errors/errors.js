export class ServerError extends Error {
  constructor(details) {
    super();
    this.name = "ServerError";
    this.details = details;
  }
}