const express = require("express");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const xss = require("xss-clean");
const cors = require("cors");
const httpStatus = require("http-status");
const passport = require("passport");
const routes = require("./routes/v1");
const ApiError = require("./utils/ApiError");
const { errorConverter, errorHandler } = require('./middlewares/error');


const app = express();

// set security HTTP headers
app.use(helmet());

app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// v1 api routes
app.use("/v1", routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.send({ status: httpStatus.NOT_FOUND, message: "NOT FOUND" });
  //   next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
