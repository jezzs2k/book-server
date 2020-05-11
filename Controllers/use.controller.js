const cloudinary = require("cloudinary");
const User = require("../Model/user.model.js");

//config
cloudinary.config({
  cloud_name: "dt9wztdih",
  api_key: "256121794527994",
  api_secret: "hxDjOIKc77lkOqeHWB8wlSmnAHk"
});

const db = require("../db.js");

module.exports.getUser = async (req, res) => {
  const users = await User.find().limit(10);
  res.render("users/index.pug", {
    users
  });
};

module.exports.profile = async (req, res) => {
  const users = await User.find().limit(10);
  res.render("users/profile.pug", {
    users
  });
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });

  res.redirect("/users");
};

module.exports.getUpdateUser = async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.render("users/update", { user });
};

module.exports.postUpdateUser = async (req, res) => {
  const id = req.params.id;
  


  const urlImg = req.file.path
    .split("/")
    .splice(1)
    .join("/");
  
  console.log(urlImg);
  return;

  const result = await cloudinary.uploader.upload(
    `https://playful-danthus.glitch.me/${urlImg}`
  );

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body, avatar: result.secure_url }
  );

  res.redirect("/users");
};
