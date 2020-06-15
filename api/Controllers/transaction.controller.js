// const Transaction = require("../../Model/transaction.model.js");
// const User = require("../../Model/user.model.js");
// const Book = require("../../Model/book.model.js");

// module.exports.getTransactions = async (req, res) => {
//   const transactions = await Transaction.find().limit(10).populate('user book');

//   const userId = req.cookies.auth;

//   const user = await User.findById(userId);

//   if (user && user.isAdmin) {
//     res.status(200).json({
//       msg: "you is admin, and here is all transaction",
//       data: {transactions}
//     })
//   } else {
//     const transactions_user = transactions.filter(item => {
//       return item.userId === userId;
//     });
//     res.status(200).json({
//       msg: "transactions, get",
//       data: {transactions_user}
//     })
//   }
// };

// module.exports.createTransaction = async (req, res) => {
//   const name = req.body.user;
//   const title = req.body.book;

//   const user = await User.findOne({ name });
//   const book = await Book.findOne({ title });

//   const newTransaction = new Transaction({
//     userId: user.id,
//     bookId: book.id,
//     isComplete: false
//   });

//   await newTransaction.save();

//   res.json(200).json({
//     msg: 'Create successfully',
//     data: {newTransaction}
//   })
// };

// module.exports.complete = async (req, res) => {
//   const id = req.params.id;

//   const transaction = await Transaction.findById(id);

//   if (transaction !== undefined) {
//     await Transaction.findOneAndUpdate(
//       {
//         _id: transaction._id
//       },
//       { isComplete: true }
//     );
//   } else {
//     res.json(400).json({
//     msg: 'Id is not defind',
//     data: null
//   })
//   }

//   res.json(200).json({
//     msg: 'is complete',
//     data: {transaction}
//   })
// };
