const router = require("express").Router();

const {
 login, postLogin
} = require("../Controllers/auth.controller.js");

router.get("/login", login);

router.post("/login", postLogin);


module.exports = router;
