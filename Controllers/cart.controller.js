const shortid = require("shortid");
const db = require("../db.js");
const Session = require('../Model/session.model.js');
const User = require('../Model/user.model.js');

module.exports.getCart = async (req, res) => {
  const userId = req.signedCookies.userId;
  const sessionId = req.signedCookies.sessionId;
  const cartInSession = await Session.findOne({sessionId});

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
    const user = await User.findOneAndUpdate({_id: userId}, {
      ...user, carts: [...carts]
    });
    
    await Session.findOneAndDelete({sessionId});

    res.render("cart/index.pug", {
      carts
    });

    return;
  }

  res.render("cart/index.pug", {
    carts
  });
};
module.exports.addToCart = async (req, res) => {
  const sessionId = req.signedCookies.sessionId;
  const bookId = req.params.id;

  const customer = await Session.findOne({sessionId});

  if (customer && customer.carts && bookId in customer.carts) {
    const sessions
    db.get("sessions")
      .find({ sessionId })
      .assign({
        carts: { ...customer.carts, [bookId]: customer.carts[bookId] + 1 }
      })
      .write();
  } else {
    if(customer && customer.cart){
      db.get("sessions")
      .find({ sessionId })
      .assign({ carts: { ...customer.carts, [bookId]: 1 } })
      .write();
    }else{
      db.get("sessions")
      .find({ sessionId })
      .assign({ carts: {[bookId]: 1 } })
      .write();
    }
  }
  
  console.log(customer);
};

module.exports.rentalBook = (req, res) => {
  if (!req.signedCookies.auth) {
    res.redirect("/auth/login");
    return;
  }
  const user = db
    .get("users")
    .find({ id: req.signedCookies.auth })
    .value();
  if (user.carts) {
    user.carts.map(i => {
      db.get("transactions")
        .push({
          id: shortid.generate(),
          userId: user.id,
          bookId: i.id,
          isComplete: false
        })
        .write();
      return 1;
    });
  }

  db.get("users")
    .find({ id: req.signedCookies.auth })
    .assign({ ...user, carts: [] })
    .value();

  res.redirect("/transactions");
};

module.exports.deleteBook = (req, res) => {};
