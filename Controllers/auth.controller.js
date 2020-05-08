const bcrypt = require('bcrypt');
const shortid = require('shortid');

const db = require("../db.js");

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
  
  const match = bcrypt.compare(user.password, req.body.password);
  
  if(!match){
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

module.exports.register = async (req, res) => {
  const data = {
    id: shortid.generate(),
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password
  };
  
  data.password = await bcrypt.hash(data.password, 10);
  
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

