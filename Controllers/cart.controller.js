const shortid = require("shortid");
const db = require("../db.js");

module.exports.getCart = (req, res) => {
  const userId = req.signedCookies.userId;
  const sessionId = req.signedCookies.sessionId;
  const cartInSession = db
    .get("sessions")
    .find({ sessionId })
    .value();

  const carts = [];

  if (cartInSession && cartInSession.carts) {
    for (const bookId in cartInSession.carts) {
      const book = db
        .get("books")
        .find({ id: bookId })
        .value();

      carts.push({
        ...book,
        amount: cartInSession.carts[bookId]
      });
    }
  }

  if (userId) {
    const user = db
      .get("users")
      .find({ id: userId })
      .value({ carts });
    db.get("users")
      .find({ userId })
      .assign({ ...user, carts: [...carts] })
      .value();

    db.get("sessions")
      .remove({ sessionId })
      .value();

    res.render("cart/index.pug", {
      carts
    });

    return;
  }

  res.render("cart/index.pug", {
    carts
  });
};
module.exports.addToCart = (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.id;

  const customer = db
    .get("sessions")
    .find({ sessionId })
    .write();

  if (customer.carts && bookId in customer.carts) {
    db.get("sessions")
      .find({ sessionId })
      .assign({
        carts: { ...customer.carts, [bookId]: customer.carts[bookId] + 1 }
      })
      .write();
  } else {
    db.get("sessions")
      .find({ sessionId })
      .assign({ carts: { ...customer.carts, [bookId]: 1 } })
      .write();
  }
};


module.exports.rentalBook = (req ,res) => {
  if(!req.signedCookies.auth){
    res.redirect('/auth/login');
    return;
  }
  
   db.get("users")
      .find({ id: req.signedCookies.auth })
      .assign({carts: [] })
      .value();

  
  
}

module.exports.deleteBook = (req, res) => {};
