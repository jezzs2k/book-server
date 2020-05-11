const cloudinary = require("cloudinary");
const User = require("../../Model/user.model.js");

//config
cloudinary.config({
  cloud_name: "dt9wztdih",
  api_key: "256121794527994",
  api_secret: "hxDjOIKc77lkOqeHWB8wlSmnAHk"
});

module.exports.getUser = async (req, res) => {
  const users = await User.find().limit(10);
  res.status(200).json({
    msg: "get users",
    data: {users}
  })
};

module.exports.profile = async (req, res) => {
  const users = await User.find().limit(10);
  res.status(200).json({
    msg: "get profile",
    data: {users}
  })
};

module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });

  res.status(200).json({
    msg: "delete successfully",
    data: {user}
  })
};

module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  
  const urlImg = req.file.path
    .split("/")
    .splice(1)
    .join("/");

  const result = await cloudinary.uploader.upload(
    `https://playful-danthus.glitch.me/${urlImg}`
  );

  const user = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body, avatar: result.secure_url }
  );

  res.status(200).json({
    msg: "update users",
    data: {user}
  })
};
