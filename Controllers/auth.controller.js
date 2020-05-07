const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

module.exports.postLogin = (req, res) => {
  let errors = [];
  if(!req.body.email){
    errors.push('Email is require?')
  }
  
  if(!req.body.password){
    errors.push('Password is require?')
  }
  
  if(errors.length > 0){
    res.render('auth/login.pug', {
      errors
    })
  }
  
  const user = db.get('users').find({email: req.body.email}).value();
  
  res.cookie('auth', user.id)
  res.redirect('/users');
};
