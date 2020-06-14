const User = require('../Model/user.model.js');

module.exports = async (req, res, next) => {
  if (!req.signedCookies.auth) {
    res.redirect('/auth/login');
    return;
  }

  const user = await User.findById(req.signedCookies.auth);

  if (!user) {
    res.render('auth/login.pug', {
      errors: ['You dose not exists!'],
    });
    return;
  }

  res.locals.user = user;
  next();
};
