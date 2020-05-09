const router = require("express").Router();

const {
  getCart,
  addToCart,
  deleteBook
} = require("../Controllers/cart.controller.js");

//get books
router.get("/", getCart);

//get from create book
router.get("/:id/add", addToCart);

//create new book {id: , description: , title: }
router.get("/:id/delete", deleteBook);

module.exports = router;
