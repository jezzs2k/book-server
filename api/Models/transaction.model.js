const Transaction = require('../Schemas/transaction.model');
const User = require('../Schemas/user.schema');

module.exports.getTransaction = async (start, end, userId) => {
  try {
    const transactions = await Transaction.find()
      .populate('user book')
      .limit(end - start);

    const user = await User.findById(userId);

    if (user && user.isAdmin) {
      return transactions;
    } else {
      const transactionsOfUser = transactions.filter((item) => {
        return item.user._id == userId;
      });
      return transactionsOfUser;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.addTransaction = async ({ userId, bookId }) => {
  try {
    const newTransaction = new Transaction({
      user: userId,
      book: bookId,
    });

    await newTransaction.save();

    return newTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.completed = async (id) => {
  try {
    const transaction = await Transaction.findById(id);

    if (transaction) {
      await Transaction.findOneAndUpdate(
        {
          _id: transaction._id,
        },
        { isComplete: true }
      );
    } else {
      throw new Error("Don't have transaction now !!");
    }

    return await Transaction.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};
