const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const hbs = require('nodemailer-express-handlebars');

const { CommonError } = require('../common/error');
const { login, register, accept } = require('../Models/auth.model');
const {
  joiUserLogin,
  joiUserRegister,
} = require('../Validators/user.validator');
const { success, err } = require('../utils/response');

module.exports.login = async (req, res) => {
  try {
    const { error, value } = joiUserLogin.validate(req.body);

    if (error) {
      return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
    }

    const token = await login(req.body);
    console.log(token);
    res.jsonp(success({ data: { token } }));
  } catch (error) {
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.register = async (req, res) => {
  try {
    const { error, value } = joiUserRegister.validate(req.body);

    if (error) {
      return res.jsonp(err(CommonError.INVALID_INPUT_PARAMS));
    }

    const user = await register(req.body);

    const transporter = await nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      })
    );

    const handlebarOptions = {
      viewEngine: {
        partialsDir: '../app/api/views/',
        layoutsDir: '../app/api/views/',
      },
      viewPath: '../app/api/views/',
      extName: '.hbs',
    };

    transporter.use('compile', hbs(handlebarOptions));

    const message = {
      from: 'vuthanhhieu00@gmail.com',
      to: user.email,
      subject: 'CREATE NEW ACCOUNT',
      template: 'email',
      context: {
        userId: user.id,
        username: user.username,
        email: user.email,
      },
    };

    const info = await transporter.sendMail(message);

    console.log('Send Main:', info.messageId);

    res.jsonp(success({ data: { info } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.accept = async (req, res) => {
  try {
    const id = req.params.id;
    await accept(id);
    res.redirect('https://google.com');
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
