module.exports.UserError = {
  NEW_PASSWORD_SAME: {
    message: 'new password and old password is same',
    errorCode: 400,
  },
  INVALID_INPUT_PARAMS: {
    message: 'Invalid Input Params',
    errorCode: 400,
  },
  CONFIRM_PASSWORD_OTHER: {
    message: 'new password and confirm password is other',
    errorCode: 400,
  },
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    errorCode: 500,
  },
  USER_NOT_FOUND: {
    message: 'User not found',
    errorCode: 500,
  },
  LOGIN_WRONG_PASSWORD: {
    message: 'password is wrong',
    code: 500,
  },
  USER_EXISTING: {
    message: 'user existed',
    code: 500,
  },
  EMAIL_FORMAT: {
    message: 'wrong email format',
    errorCode: 500,
  },
};

module.exports.AuthError = {
  NO_TOKEN: {
    message: 'No token',
    errorCode: 400,
  },
};

module.exports.CommonError = {
  INVALID_INPUT_PARAMS: {
    message: 'Invalid Input Params',
    errorCode: 400,
  },
  UNKNOWN_ERROR: {
    message: 'Unknown error',
    errorCode: 500,
  },
};
