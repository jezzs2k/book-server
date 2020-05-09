const router = require("express").Router();

const {
  getCart,
  addToCart,
  deleteBook,
  rentalBook
} = require("../Controllers/cart.controller.js");

//get books
router.get("/", getCart);

//get from create book
router.get("/:id/add", addToCart);

router.get("/rental/books", rentalBook)

//create new book {id: , description: , title: }
router.get("/:id/delete", deleteBook);

module.exports = router;
