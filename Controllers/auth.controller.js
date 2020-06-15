const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');

const User = require('../Model/user.model.js');

module.exports.login = (req, res) => {
  res.render('auth/login.pug');
};

module.exports.postLogin = async (req, res) => {
  const errors = [];

  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    res.render('auth/login.pug', {
      errors: ['User dose not exists'],
    });
    return;
  }

  if (!user.isActive) {
    res.render('auth/login.pug', {
      errors: ['User dose not active, you can check email again '],
    });
    return;
  }

  if (user.wrongLoginCount >= 4) {
    res.render('auth/login.pug', {
      errors: ['You have login than more 3 times'],
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

    res.render('auth/login.pug', {
      errors: ['Password-wrong'],
    });

    return;
  }

  res.cookie('auth', user.id, {
    signed: true,
  });
  res.redirect('/users');
};

module.exports.signup = (req, res) => {
  res.render('auth/register.pug');
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
    isAdmin: false,
  };

  data.password = await bcrypt.hash(data.password, 10);

  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.render('auth/register.pug', {
      error: 'email have exists',
    });
    return;
  }

  const newUser = new User(data);

  const link = `https://playful-danthus.glitch.me/auth/${newUser._id}/accept`;
  const msg = {
    to: data.email,
    from: 'vuthanhhieu00@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'xac nhan email',

    html: `<a href=${link}>xac nhan tai khoan</a>`,
  };

  await newUser.save();

  sgMail.send(msg);
  res.render('auth/active.pug');
};

module.exports.accept = (req, res) => {
  res.render('auth/active.pug');
};

module.exports.postAccept = async (req, res) => {
  const id = req.params.id;

  await User.findOneAndUpdate({ _id: id }, { isActive: true });

  res.redirect('/auth/login');
};
