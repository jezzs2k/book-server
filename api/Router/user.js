const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });

const {
  getUser,
  deleteUser,
  updateUser,
  profile
} = require("../Controllers/user.controller.js");

//get user
router.get("/", getUser);

router.get("/profile", profile);

//deleteuser by id
router.delete("/:id/delete", deleteUser);

//post update user
router.post("/profile/:id/update", upload.single("avatar"), updateUser);

module.exports = router;
