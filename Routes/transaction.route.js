const router = require("express").Router();
const shortid = require("shortid");

const db = require("../db.js");

//get transaction
router.get("/", (req, res) => {
  const transactions = db.get("transactions").value();

  res.render("transaction/index.pug", {
    transactions
  });
});

//get form transaction
router.get("/create", (req, res) => {
  const users = db.get("users").value();
  const books = db.get("books").value();

  res.render("transaction/create.pug", {
    users,
    books
  });
});

//post transaction
router.post("/create", (req, res) => {
  const name = req.body.user;
  const title = req.body.book;
  
  const user = db
    .get("users")
    .find({ name })
    .value();
  const book = db
    .get("books")
    .find({ title })
    .value();

  db.get("transactions").push({
    id: shortid.generate(),
    userId: user.id,
    bookId: book.id
  }).write();

  res.redirect("/transactions");
});

module.exports = router;
