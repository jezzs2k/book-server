const { CommonError } = require('../common/error');
const { profile, deleteUser, updateUser } = require('../Models/user.model');
const { joiUpdateUser } = require('../Validators/user.validator');
const { success, err } = require('../utils/response');

module.exports.profile = async (req, res) => {
  try {
    const user = await profile(req.user.userId);

    res.jsonp(success({ data: { user } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.getProfileById = async (req, res) => {
  try {
    const user = await profile(req.params.userId);

    res.jsonp(success({ data: { user } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const user = await deleteUser(req.params.id);
    res.jsonp(success({ data: { user } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { error, value } = joiUpdateUser.validate(req.body);

    if (error) {
      console.log(error.message);
      return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
    }

    const user = await updateUser(req.body, req.user.userId);

    res.jsonp(success({ data: { user } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
