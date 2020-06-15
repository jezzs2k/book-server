const Cart = require('../Schemas/cart.schema');
const { addTransaction } = require('./transaction.model');

module.exports.addToCart = async (bookId, userId) => {
  try {
    const bookInCart = await Cart.findOne({ book: bookId });

    if (bookInCart) {
      bookInCart.amount = bookInCart.amount + 1;
      await bookInCart.save();
      return bookInCart;
    } else {
      const addNewBookInCart = new Cart({
        book: bookId,
        user: userId,
      });

      await addNewBookInCart.save();

      return addNewBookInCart;
    }
  } catch (error) {
    console.log(error.message);
    throw new Error({ message: error.message });
  }
};

module.exports.getCarts = async (userId) => {
  try {
    const carts = await Cart.find({ user: userId }).populate('book');

    return carts;
  } catch (error) {
    console.log(error.message);
    throw new Error({ message: error.message });
  }
};

module.exports.deleteCarts = async (id) => {
  try {
    const cart = await Cart.findOneAndDelete({ _id: id });

    return cart;
  } catch (error) {
    console.log(error.message);
    throw new Error({ message: error.message });
  }
};

module.exports.toRentBook = async (userId) => {
  try {
    const carts = await Cart.find({ user: userId });

    if (carts.length > 0) {
      carts.forEach(async (item) => {
        await addTransaction({ userId, bookId: item.book });
        await Cart.findOneAndDelete({ _id: item._id });
      });
    }

    return carts;
  } catch (error) {
    console.log(error.message);
    throw new Error({ message: error.message });
  }
};
