const shortid = require("shortid");
const cloudinary = require('cloudinary');

//config
cloudinary.config({ 
  cloud_name: 'dt9wztdih', 
  api_key: '256121794527994', 
  api_secret: 'hxDjOIKc77lkOqeHWB8wlSmnAHk' 
});

const db = require("../db.js");


module.exports.getUser = (req, res) => {
  const users = db.get("users").value();
  res.render("users/index.pug", {
    users
  });
};

module.exports.profile = (req, res) => {
  const users = db.get("users").value();
  res.render("users/profile.pug", {
    users
  });
}

module.exports.deleteUser = (req, res) => {
  const id = req.params.id;
  db.get("users")
    .remove(i => i.id === id)
    .write();

  res.redirect("/users");
};

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
  
  const urlImg = req.body.avatar;
  
 console.log(req.body)
  
  cloudinary.uploader.upload(`${req.body.avatar}`, function(error, result) {console.log(result, error)});
  
  return;
  
  db.get("users")
    .find({ id })
    .assign({ ...req.body })
    .write();

  res.redirect("/users");
};
