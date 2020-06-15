const {
  addToCart,
  getCarts,
  deleteCarts,
  toRentBook,
} = require('../Models/cart.model');
const { success, err } = require('../utils/response');
const { CommonError } = require('../common/error');

module.exports.addToCart = async (req, res) => {
  try {
    const carts = await addToCart(req.params.bookId, req.user.userId);

    res.jsonp(success({ data: { carts } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.getCarts = async (req, res) => {
  try {
    const carts = await getCarts(req.user.userId);

    res.jsonp(success({ data: { carts } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.deleteCart = async (req, res) => {
  try {
    const cart = await deleteCarts(req.params.id);

    res.jsonp(success({ data: { cart } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};

module.exports.toRentBook = async (req, res) => {
  try {
    const carts = await toRentBook(req.user.userId);

    res.jsonp(success({ data: { carts } }));
  } catch (error) {
    console.log(error.message);
    res.jsonp(err(CommonError.UNKNOWN_ERROR));
  }
};
