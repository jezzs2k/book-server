const jwt = require('jsonwebtoken');
const { VERIFY_TOKEN } = require('../configs/default.json');

const { AuthError, CommonError } = require('../common/error');
const { err } = require('../utils/response');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('auth-token');

    const decode = await jwt.verify(token, VERIFY_TOKEN);

    if (!decode) {
      return res.jsonp(err(AuthError.NO_TOKEN));
    }

    req.user = decode.user;

    next();
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
