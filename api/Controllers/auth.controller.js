const bcrypt = require("bcrypt");
const User = require("../../Model/user.model.js");

module.exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    res.status(400).json({
      msg: "User is not defind",
      data: null
    });
    return;
  }

  if (!user.isActive) {
    res.status(400).json({
      msg: "User is not active, check you email again",
      data: null
    });
    return;
  }

  if (user.wrongLoginCount >= 4) {
    res.status(400).json({
      msg: "Ban da nhap sai qua 4 lan cho phep, tai khoan cuar ban bi tam khoa",
      data: null
    });
    return;
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    if (user.wrongLoginCount) {
      const user = await User.findOneAndUpdate(
        { _id: user._id },
        { wrongLoginCount: user.wrongLoginCount + 1 }
      );
    } else {
      const user = await User.findOneAndUpdate(
        { _id: user._id },
        { wrongLoginCount: 1 }
      );
    }

    res.status(400).json({
      msg: "password incorrect",
      data: null
    });

    return;
  }

  res.status(200).json({
    msg: "Login successfully",
    data: { userId: user._id }
  });
};
