const {
  getTransaction,
  addTransaction,
  completed,
} = require('../Models/transaction.model');
const { success, err } = require('../utils/response');
const { CommonError } = require('../common/error');

module.exports.getTransactions = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;

    if (page === 0) {
      page = 1;
    }
    const perPage = 8;
    const start = (page - 1) * perPage;
    const end = (page - 1) * perPage + perPage;

    const transactions = await getTransaction(start, end, req.user.userId);

    res.jsonp(success({ data: { transactions } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.createTransaction = async (req, res) => {
  try {
    const transaction = await addTransaction({
      userId: req.user.userId,
      bookId: req.params.bookId,
    });

    res.jsonp(success({ data: { transaction } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.complete = async (req, res) => {
  try {
    const transaction = await completed(req.params.id);

    res.jsonp(success({ data: { transaction } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
