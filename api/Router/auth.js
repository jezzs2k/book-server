const router = require("express").Router();

const { login, register, accept } = require("../Controllers/auth.controller.js");

router.post("/login", login);
router.post("/register", register);
router.put("/:id/accept", accept);

module.exports = router;
