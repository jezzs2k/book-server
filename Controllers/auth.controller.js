const bcrypt = require("bcrypt");
const shortid = require("shortid");
const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

module.exports.postLogin = async (req, res) => {
  const errors = [];

  const user = db
    .get("users")
    .find({ email: req.body.email })
    .value();

  if (!user) {
    res.render("auth/login.pug", {
      errors: ["User dose not exists"]
    });
    return;
  }

  if (!user.isActive) {
    res.render("auth/login.pug", {
      errors: ["User dose not active, you can check email again "]
    });
    return;
  }

  if (user.wrongLoginCount && user.wrongLoginCount >= 4) {
    res.render("auth/login.pug", {
      errors: ["You have login than more 3 times"]
    });

    return;
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    if (user.wrongLoginCount) {
      db.get("users")
        .find({ email: req.body.email })
        .assign({ wrongLoginCount: user.wrongLoginCount + 1 })
        .write();
    } else {
      db.get("users")
        .find({ email: req.body.email })
        .assign({ wrongLoginCount: 1 })
        .write();
    }

    res.render("auth/login.pug", {
      errors: ["Password-wrong"]
    });

    return;
  }

  res.cookie("auth", user.id, {
    signed: true
  });
  res.redirect("/users");
};

module.exports.signup = (req, res) => {
  res.render("auth/register.pug");
};

module.exports.register = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const data = {
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    isActive: false,
    isAdmin: false
  };

  const link = `https://faint-elderly-icecream.glitch.me/auth/${data.id}/accept`;
  const msg = {
    to: data.email,
    from: "vuthanhhieu00@gmail.com",
    subject: "Sending with Twilio SendGrid is Fun",
    text: "xac nhan email",

    html: `<a href=${link}>xac nhan tai khoan</a>`
  };

  data.password = await bcrypt.hash(data.password, 10);

  const user = db
    .get("users")
    .find({ email: req.body.email })
    .value();

  if (user) {
    res.render("auth/register.pug", {
      error: "email have exists"
    });
    return;
  }

  db.get("users")
    .push(data)
    .write();

  sgMail.send(msg);
  res.render("auth/active.pug");
};

module.exports.accept = (req, res) => {
  res.render("auth/active.pug");
};

module.exports.postAccept = (req, res) => {
  const id = req.params.id;

  db.get("users")
    .find({ id })
    .assign({ isActive: true })
    .write();

  res.redirect("/auth/login");
};
