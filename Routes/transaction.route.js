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

module.exports = router;
