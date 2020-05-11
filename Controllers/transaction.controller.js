const shortid = require("shortid");
const Transaction = require("../Model/transaction.model.js");
const User = require("../Model/user.model.js");
const Book = require("../Model/book.model.js");

module.exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find().limit(10);

  const userId = req.cookies.auth;

  const user = await User.findById(userId);

  if (user && user.isAdmin) {
    res.render("transaction/index.pug", {
      transactions
    });
  } else {
    const transactions_user = transactions.filter(item => {
      return item.userId === userId;
    });
    res.render("transaction/index.pug", {
      transactions: [...transactions_user]
    });
  }
};

module.exports.getCreateTransaction = async (req, res) => {
  const users = await User.find();
  const books = await Book.find();

  res.render("transaction/create.pug", {
    users,
    books
  });
};

module.exports.postCreateTransaction = async (req, res) => {
  const name = req.body.user;
  const title = req.body.book;

  const user = await User.findOne({ name });
  const book = await Book.findOne({ title });

  const newTransaction = new Transaction({
    userId: user.id,
    bookId: book.id,
    isComplete: false
  });

  await newTransaction.save();

  res.redirect("/transactions");
};

module.exports.complete = async (req, res) => {
  const id = req.params.id;

  const transaction = await Transaction.findById(id);

  if (transaction !== undefined) {
    await Transaction.findOneAndUpdate(
      {
        _id: transaction._id
      },
      { isComplete: true }
    );
  } else {
    res.render("transaction/index.pug", {
      error: "Id is not defined"
    });
  }

  res.redirect("/transactions");
};
