const bcrypt = require("bcrypt");
const shortid = require("shortid");

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

  console.log();

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

  res.cookie("auth", user.id,{
    signed: true
  });
  res.redirect("/users");
};

module.exports.signup = (req, res) => {
  res.render("auth/register.pug");
};

module.exports.register = async (req, res) => {
  const data = {
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
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
  res.redirect("/users");
};
