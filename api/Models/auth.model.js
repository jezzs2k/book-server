const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { VERIFY_TOKEN } = require('../configs/default.json');
const User = require('../Schemas/user.schema');

module.exports.login = async (data) => {
  try {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error({ message: "User don't exists !" });
    }

    if (!user.isActive) {
      throw new Error({
        message: 'User is not active, check you email again ?',
      });
    }

    const match = await bcrypt.compare(data.password, user.password);

    if (!match) {
      throw new Error({
        message: 'Password is not corrected ?',
      });
    }

    const payload = {
      user: {
        userId: user.id,
      },
    };

    const token = await jwt.sign(payload, VERIFY_TOKEN, {
      expiresIn: 1000 * 60 * 60 * 24,
    });

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.register = async (data) => {
  try {
    const checkUser = await User.findOne({ email: data.email });

    if (checkUser) {
      throw new Error({ message: 'User did exists!' });
    }

    const passwordVerify = await bcrypt.hash(data.password, 10);

    const user = new User({
      ...data,
      password: passwordVerify,
    });

    await user.save();

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.accept = async (id) => {
  try {
    const user = await User.findOneAndUpdate({ _id: id }, { isActive: true });
    if (!user) {
      throw new Error({ message: "User don't exists !" });
    }

    return user;
  } catch (error) {
    throw new Error(error);
  }
};
