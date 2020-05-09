const shortid = require("shortid");
const db = require("../db.js");

module.exports.getCart = (req, res) => {
  const userId = req.signedCookies.userId;
  const sessionId = req.signedCookies.sessionId;
  const cartInSession = db
    .get("sessions")
    .find({ sessionId })
    .value();

  const carts = null;

  if (cartInSession.carts) {
    carts = cartInSession.carts.map(i => {
      console.log(i);
      // return db.get('books').find({i});
    });
  }

  console.log(cartInSession);

  return;

  if (userId) {
    const user = db
      .get("users")
      .find({ userId })
      .value();
    db.get("users")
      .find({ userId })
      .assign({ ...user, carts: [] })
      .value();

    res.render("cart/index.pug", {
      carts: cartInSession
    });
    return;
  }

  res.render("cart/index.pug", {
    carts: cartInSession
  });
};
module.exports.addToCart = (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.id;

  const customer = db
    .get("sessions")
    .find({ sessionId })
    .write();

  if (bookId in customer) {
    console.log(customer);
    db.get("sessions")
      .find({ sessionId })
      .assign({
        carts: [...customer.carts, { [bookId]: customer[bookId] + 1 }]
      })
      .write();
  } else {
    db.get("sessions")
      .find({ sessionId })
      .assign({ carts: [{ [bookId]: 1 }] })
      .write();
  }

  console.log(customer);
};

module.exports.deleteBook = (req, res) => {};
