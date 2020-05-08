const router = require("express").Router();

const authValidater = require("../validater/auth.js");

const {
  login,
  postLogin,
  signup,
  register
} = require("../Controllers/auth.controller.js");

router.get("/login", login);

router.post("/login", authValidater, postLogin);

router.get("/register", signup);

router.post("/register", register);

module.exports = router;
