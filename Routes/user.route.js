const router = require('express').Router();
const shortid = require('shortid');

const db = require('../db.js')

//get user
router.get("/", (req, res) => {
  const users = db.get("users").__wrapped__.books;
  res.render("users/index.pug", {
    users
  });
});

router.get("/create", (req, res) => {
  res.render("users/create.pug");
});

//create new user {id: , phone: , name: }
router.post("/", (req, res) => {
  const data = {
    id: shortid.generate(),
    title: req.body.name,
    phone: req.body.phone
  };

  db.get("users")
    .push(data)
    .write();
  res.redirect("/users");
});

//deleteuser by id
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  db.get("users")
    .remove(i => i.id === id)
    .write();

  res.redirect("/users");
});

//update user by id
router.get("/:id/update", (req, res) => {
  const id = req.params.id;

  const book = db
    .get("users")
    .find({ id })
    .value();

  res.render("users/update", { book });
});

router.post("/:id/update", (req, res) => {
  const id = req.params.id;

  db.get("users")
    .find({ id })
    .assign({ ...req.body })
    .write();

  res.redirect("/users");
});

module.exports = router;