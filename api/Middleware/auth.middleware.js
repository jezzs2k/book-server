const jwt = require('jsonwebtoken');
const { VERIFY_TOKEN } = require('../configs/default.json');

const { AuthError, CommonError } = require('../common/error');
const { success, err } = require('../utils/response');

module.exports = async (req, res) => {
  try {
    const token = req.headers('auth-token');

    const decode = await jw.verify(token, VERIFY_TOKEN);

    if (decode) {
      res.jsonp(err(AuthError.NO_TOKEN));
    }

    res.user = decode.user;

    next();
  } catch (error) {
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
