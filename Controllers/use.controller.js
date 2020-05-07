const shortid = require("shortid");
const db = require("../db.js");

module.exports.getUser = (req, res) => {
  const users = db.get("users").value();
  res.render("users/index.pug", {
    users
  });
};

module.exports.getCreateUser = (req, res) => {
  res.render("users/create.pug");
};

module.exports.postCreateUser = (req, res) => {
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
    res.render("users/create.pug", {
      error: 'email have exists'
    });
    return;
  }
  
  db.get("users")
    .push(data)
    .write();
  res.redirect("/users");
};

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.get("users")
    .remove(i => i.id === id)
    .write();

  res.redirect("/users");
}

module.exports.getUpdateUser = (req, res) => {
  const id = req.params.id;

  const user = db
    .get("users")
    .find({ id })
    .value();

  res.render("users/update", { user });
};

module.exports.postUpdateUser = (req, res) => {
  const id = req.params.id;

  db.get("users")
    .find({ id })
    .assign({ ...req.body })
    .write();

  res.redirect("/users");
}