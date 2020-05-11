const shortid = require("shortid");
const Book = require("../Model/book.model.js");

module.exports.getBook = async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  if (page === 0) {
    page = 1;
  }
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = (page - 1) * perPage + perPage;

  const books = await Book.find().limit(end - start);

  res.render("books/index.pug", {
    books,
    page,
    url: "https://playful-danthus.glitch.me/"
  });
};

module.exports.getCreateBook = (req, res) => {
  res.render("books/create.pug");
};

module.exports.postCreateBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    des: req.body.des
  });

  await book.save();
  res.redirect("/books");
};

module.exports.deleteBook = async (req, res) => {
  const id = req.params.id;

  await Book.findOneAndDelete({ _id: id });

  res.redirect("/");
};

module.exports.getUpdateBook = async (req, res) => {
  const id = req.params.id;

  const book = await Book.findById(id);

  res.render("books/update", { book });
};

module.exports.postUpdateBook = async (req, res) => {
  const id = req.params.id;

  await Book.findOneAndUpdate({ _id: id }, { ...req.body });

  res.redirect("/");
};
