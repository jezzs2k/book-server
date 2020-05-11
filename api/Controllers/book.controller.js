const Book = require("../../Model/book.model.js");

module.exports.getBook = async (req, res) => {
  let page = parseInt(req.query.page) || 1;

  if (page === 0) {
    page = 1;
  }
  const perPage = 8;

  const start = (page - 1) * perPage;
  const end = (page - 1) * perPage + perPage;

  const books = await Book.find().limit(end - start);

  res.status(200).json({ msg: "get books", data: { books } });
};

module.exports.createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    des: req.body.des
  });

  await book.save();
  res.status(201).json({ msg: "create book", data: { book } });
};

module.exports.deleteBook = async (req, res) => {
  const id = req.params.id;

  await Book.findOneAndDelete({ _id: id });

  res.status(200).json({ msg: "delete book", data: null });
};

module.exports.updateBook = async (req, res) => {
  const id = req.params.id;

  await Book.findOneAndUpdate({ _id: id }, { ...req.body });

  res.status(200).json({ msg: "update book", data: null });
};
