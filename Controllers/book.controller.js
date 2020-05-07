const shortid = require("shortid");
const db = require("../db.js");

module.exports.getBook = (req, res) => {
  const books = db.get("books").value();
  
  res.render("books/index.pug", {
    books
  });
}
module.exports.getCreateBook = (req, res) => {
  res.render("books/create.pug");
}

module.exports.postCreateBook = (req, res) => {
  const data = {
    id: shortid.generate(),
    title: req.body.title,
    des: req.body.des
  };

  db.get("books")
    .push(data)
    .write();
  res.redirect("/books");
}

module.exports.deleteBook = (req, res) => {
  const id = req.params.id;
  db.get("books")
    .remove(i => i.id === id)
    .write();

  res.redirect("/books");
}

module.exports.getUpdateBook = (req, res) => {
  const id = req.params.id;

  const book = db
    .get("books")
    .find({ id })
    .value();

  res.render("books/update", { book });
}

module.exports.postUpdateBook = (req, res) => {
  const id = req.params.id;

  db.get("books")
    .find({ id })
    .assign({ ...req.body })
    .write();

  res.redirect("/books");
};