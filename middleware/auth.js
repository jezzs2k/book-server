const db = require("../db");

module.exports = (req, res, next) => {
  if (!req.signedCookies.auth) {
    res.redirect("/auth/login");
    return;
  }
  
  const user = db
    .get("users")
    .find({ id: req.signedCookies.auth })
    .value();

  if (!user) {
    res.render("auth/login.pug", {
      errors: ["You dose not exists!"]
    });
    return;
  }

  res.locals.user = user;
  next();
};
