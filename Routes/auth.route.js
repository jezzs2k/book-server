const router = require("express").Router();

const authValidater = require("../validater/auth.js");

const {
  login,
  postLogin,
  register,
  signup
} = require("../Controllers/auth.controller.js");

router.get("/login", login);

router.post("/login", authValidater, postLogin);

router.get("/register", signup);

router.post("/register", authValidater, register);

module.exports = router;
