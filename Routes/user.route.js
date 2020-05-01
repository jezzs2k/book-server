const router = require("express").Router();

const {
  getUser,
  getCreateUser,
  postCreateUser,
  deleteUser,
  getUpdateUser,
  postUpdateUser
} = require("../Controllers/use.controller.js");

//get user
router.get("/", getUser);

//get from create user
router.get("/create", getCreateUser);

//create new user {id: , phone: , name: }
router.post("/", postCreateUser);

//deleteuser by id
router.get("/:id/delete", deleteUser);

//update user by id
router.get("/:id/update", getUpdateUser);

//post update user
router.post("/:id/update", postUpdateUser);

module.exports = router;
