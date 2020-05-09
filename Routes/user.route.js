const router = require("express").Router();

const {
  getUser,
  getCreateUser,
  postCreateUser,
  deleteUser,
  getUpdateUser,
  postUpdateUser,
  profile
} = require("../Controllers/use.controller.js");

//get user
router.get("/", getUser);

router.get("/profile", profile);


//deleteuser by id
router.get("/:id/delete", deleteUser);

//update user by id
router.get("/:id/update", getUpdateUser);

//post update user
router.post("/:id/update", postUpdateUser);

module.exports = router;
