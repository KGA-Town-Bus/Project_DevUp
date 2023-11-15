class HttpException extends Error {
  constructor(message, error, statusCode) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
    this.timestamp = new Date().toLocaleString("en-US", {
      timezone: "Asia/Seoul",
      hour12: false,
    });
  }
}

class BadRequest extends HttpException {
  constructor(errorMessage) {
    super();
    this.statusCode = 400;
    this.error = "Bad Request";
    this.errorMessage = errorMessage;
  }
}

class Unauthorized extends HttpException {
  constructor(errorMessage) {
    super();
    this.statusCode = 401;
    this.error = "Unauthorized";
    this.errorMessage = errorMessage;
  }
}
class InternalServerError extends HttpException {
  constructor(errorMessage) {
    super();
    this.statusCode = 500;
    this.error = "Internal Server Error";
    this.errorMessage = errorMessage;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  InternalServerError,
};
