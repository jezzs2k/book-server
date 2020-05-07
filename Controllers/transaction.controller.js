const shortid = require("shortid");
const db = require("../db.js");

module.exports.getTransactions = (req, res) => {
  const transactions = db.get("transactions").value();

  const userId = req.cookies;
  
  console.log(userId);
  
  return;
  const user = db.get("transactions").find({ id: userId });

  if (user.isAdmin) {
    res.render("transaction/index.pug", {
      transactions
    });
  } else {
    res.send("It is feature of admin!");
  }
};

module.exports.getCreateTransaction = (req, res) => {
  const users = db.get("users").value();
  const books = db.get("books").value();

  res.render("transaction/create.pug", {
    users,
    books
  });
};

module.exports.postCreateTransaction = (req, res) => {
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

  db.get("transactions")
    .push({
      id: shortid.generate(),
      userId: user.id,
      bookId: book.id,
      isComplete: false
    })
    .write();

  res.redirect("/transactions");
};

module.exports.complete = (req, res) => {
  const id = req.params.id;

  const transaction = db
    .get("transactions")
    .find({ id })
    .value();

  if (transaction !== undefined) {
    db.get("transactions")
      .find({ id })
      .assign({ isComplete: true })
      .write();
  } else {
    res.render("transaction/index.pug", {
      error: "Id is not defined"
    });
  }

  res.redirect("/transactions");
};
