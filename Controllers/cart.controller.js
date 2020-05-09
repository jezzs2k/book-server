const shortid = require("shortid");
const db = require("../db.js");

module.exports.getCart = (req, res) => {};
module.exports.addToCart = (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.id;

  const customer = db
    .get("sessions")
    .find({ sessionId })
    .write();

  if (bookId in customer) {
    db.get("sessions")
      .find({ sessionId })
      .assign({
        [bookId]: customer[bookId] + 1
      })
      .write();
  } else {
    db.get("sessions")
      .find({ sessionId })
      .assign({
        [bookId]: 1
      })
      .write();
  }

  console.log(customer);

  return;
  res.redirect("/carts");
};

module.exports.deleteBook = (req, res) => {};
