const router = require("express").Router();

const {
  getCart,
  addToCart,
  deleteBook,
  rentalBook
} = require("../Controllers/session.controller.js");

//get books
router.get("/", getCart);

//get from create book
router.post("/:id/add", addToCart);

router.get("/rental/books", rentalBook)

//create new book {id: , description: , title: }
router.delete("/:id/delete", deleteBook);

module.exports = router;
