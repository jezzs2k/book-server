const router = require("express").Router();

const { login } = require("../Controllers/auth.controller.js");

router.post("/login", login);

module.exports = router;
