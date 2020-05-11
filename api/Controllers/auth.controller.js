const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

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

module.exports.register = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const data = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    isActive: false,
    wrongLoginCount: 0,
    isAdmin: false
  };

  data.password = await bcrypt.hash(data.password, 10);

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).json({
      msg: "User is exists",
      data: null
    });
    return;
  }

  const newUser = new User(data);

  const link = `https://playful-danthus.glitch.me/auth/${newUser._id}/accept`;
  const msg = {
    to: data.email,
    from: "vuthanhhieu00@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "xac nhan email",

    html: `<a href=${link}>xac nhan tai khoan</a>`
  };

  await newUser.save();

  sgMail.send(msg);
  res.status(200).json({
    msg: "Please check your mail",
    data: null
  });
};

module.exports.accept = async (req, res) => {
  const id = req.params.id;

  await User.findOneAndUpdate({ _id: id }, { isActive: true });

  res.status(200).json({
    msg: "Create user successfully",
    data: { userId: id }
  });
};
