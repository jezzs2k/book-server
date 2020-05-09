const router = require("express").Router();
const multer  = require('multer')
const upload = multer({ dest: './public/uploads' })

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
router.get("/profile/:id/update", getUpdateUser);

//post update user
router.post("/profile/:id/update", upload.single('avatar'),postUpdateUser);

module.exports = router;
