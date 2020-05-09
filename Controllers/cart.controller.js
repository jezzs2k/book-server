const shortid = require("shortid");
const db = require("../db.js");

module.exports.getCart = (req, res) => {
  
};
module.exports.addToCart = (req, res) => {
  const sessionId = req.cookie.sessionId;
  const bookId = req.params.id;
  
  console.log(sessionId, bookId);
  return;
};

module.exports.deleteBook = (req, res) => {
  
};
