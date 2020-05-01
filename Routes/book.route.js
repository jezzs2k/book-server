const router = require("express").Router();
const shortid = require("shortid");

const db = require("../db.js");

//get books
router.get("/", );

//get from create book
router.get("/create", (req, res) => {
  res.render("books/create.pug");
});

//create new book {id: , description: , title: }
router.post("/", (req, res) => {
  const data = {
    id: shortid.generate(),
    title: req.body.title,
    des: req.body.des
  };

  db.get("books")
    .push(data)
    .write();
  res.redirect("/books");
});

//deletebookby id
router.get("/:id/delete", (req, res) => {
  const id = req.params.id;
  db.get("books")
    .remove(i => i.id === id)
    .write();

  res.redirect("/books");
});

//updatebookby id
router.get("/:id/update", (req, res) => {
  const id = req.params.id;

  const book = db
    .get("books")
    .find({ id })
    .value();

  res.render("books/update", { book });
});

//post update books
router.post("/:id/update", (req, res) => {
  const id = req.params.id;

  db.get("books")
    .find({ id })
    .assign({ ...req.body })
    .write();

  res.redirect("/books");
});

module.exports = router;
