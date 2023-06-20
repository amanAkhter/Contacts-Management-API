const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  // Passing the status code from the response
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Handling the different Errors based on their response's status code
  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;

    default:
    //   console.log("Error could not be found");
      break;
  }
};

module.exports = errorHandler;
