const router = require("express").Router();

const authValidater = require("../validater/auth.js");

const {
  login,
  postLogin,
  signup,
  register,
  accept,
  postAccept
} = require("../Controllers/auth.controller.js");

router.get("/login", login);

router.post("/login", authValidater, postLogin);

router.get("/register", signup);

router.post("/register", register);

router.get("/accept", accept);

router.get("/:id/accept", postAccept);

module.exports = router;
