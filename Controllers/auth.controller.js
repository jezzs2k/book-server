const db = require("../db.js");

module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

module.exports.postLogin = (req, res) => {
  const errors = [];
  if(!req.body.email){
    errors.push('Email is require?')
  }
  
  if(!req.body.password){
    errors.push('Password is require?')
  }
  
  
};
