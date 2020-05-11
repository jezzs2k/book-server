const router = require("express").Router();

const {
  getCart,
  addToCart,
  rentalBook
} = require("../Controllers/session.controller.js");

//get books
router.get("/", getCart);

//get from create book
router.post("/:id/add", addToCart);

router.get("/rental/books", rentalBook)

module.exports = router;
