const Transaction = require("../../Model/transaction.model.js");
const User = require("../../Model/user.model.js");
const Book = require("../../Model/book.model.js");

module.exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find().limit(10).populate('user book');

  const userId = req.cookies.auth;

  const user = await User.findById(userId);

  if (user && user.isAdmin) {
    res.status(200).json({
      msg: "you is admin, and here is all transaction",
      data: {transactions}
    })
  } else {
    const transactions_user = transactions.filter(item => {
      return item.userId === userId;
    });
    res.status(200).json({
      msg: "transactions, get",
      data: {transactions_user}
    })
  }
};

