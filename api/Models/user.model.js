const User = require('../Schemas/user.schema');
const Store = require('../Schemas/stores.schema');
const { findOneAndUpdate } = require('../Schemas/user.schema');

module.exports.profile = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User didn't exists !!");
    }

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.deleteUser = async (id) => {
  try {
    await Store.findOneAndDelete({ user: id });
    const user = await User.findOneAndDelete({ _id: id });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports.updateUser = async (data, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("User didn't exists !!");
    }

    if (data.avatar) user.avatar = data.avatar;
    if (data.username) user.username = data.username;
    if (data.phone) user.phone = data.phone;

    await user.save();
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
