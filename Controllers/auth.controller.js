const bcrypt = require('bcrypt');
const shortid = require('shortid');

const db = require("../db.js");
const verifyPassword = require('../config/default.json').VERIFY_PASS;

module.exports.login = (req, res) => {
  res.render("auth/login.pug");
};

module.exports.postLogin = async (req, res) => {
  const errors = [];
  
  const user = db.get('users').find({email: req.body.email}).value();
  
  if(!user){
    res.render('auth/login.pug', {
      errors: ['User dose not exists']
    })
    return;
  }
  
  const hashPassword = bcrypt.hash(verifyPassword, req.body.password);
  
  if(user.password !== hashPassword){
    res.render('auth/login.pug', {
      errors: ['Password-wrong']
    })
    return;
  }
  
  res.cookie('auth', user.id)
  res.redirect('/users');
};


module.exports.signup = (req, res) => {
  res.render("auth/register.pug");
};

module.exports.register = (req, res) => {
  const data = {
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };
  
  const user = db.get("users")
    .find({email: req.body.email})
    .value();
  
  if(user){
    res.render("auth/register.pug", {
      error: 'email have exists'
    });
    return;
  }
  
  db.get("users")
    .push(data)
    .write();
  res.redirect("/users");
};

