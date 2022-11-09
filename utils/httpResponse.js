const { response } = require("express");

let HttpStatus = {
  OK: 200,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
};

const Ok = (res = response, msg, data) => {
  return res.status(HttpStatus.OK).json({
    error: false,
    statusCode: HttpStatus.OK,
    msg: msg,
    data: data,
  });
};

const NotFound = (res = response, msg, data) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    error: true,
    statusCode: HttpStatus.NOT_FOUND,
    msg: msg,
    data: data ? data : [],
  });
};

const Unauthorized = (res = response, msg, data) => {
  return res.status(HttpStatus.UNAUTHORIZED).json({
    error: true,
    statusCode: HttpStatus.UNAUTHORIZED,
    msg: msg,
    data: data ? data : [],
  });
};

const Forbidden = (res = response, msg, data) => {
  return res.status(HttpStatus.FORBIDDEN).json({
    error: true,
    statusCode: HttpStatus.FORBIDDEN,
    msg: msg,
    data: data ? data : [],
  });
};

const Error = (res = response, msg, data) => {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    error: true,
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    msg: msg,
    data: data ? data : [],
  });
};

module.exports = {
  Ok,
  Forbidden,
  Error,
  Unauthorized,
  NotFound,
};