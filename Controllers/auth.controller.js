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
    
    return;
  }
  
  const user = db.get('users').find({email: req.body.email}).value();
  
  if(!user){
    res.render('auth/login.pug', {
      errors: ['User dose not exists']
    })
    return;
  }
  
  if(user.password !== req.body.password){
    res.render('auth/login.pug', {
      errors: ['Password-wrong']
    })
    return;
  }
  
  res.cookie('auth', user.id)
  res.redirect('/users');
};
