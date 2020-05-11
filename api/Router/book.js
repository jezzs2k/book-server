const router = require("express").Router();

const {
  getBook,
  createBook,
  deleteBook,
  updateBook
} = require("../Controllers/book.controller.js");

//get books
router.get("/", getBook);

//create new book {id: , description: , title: }
router.post("/", createBook);

//deletebookby id
router.delete("/:id/delete", deleteBook);

//post update books
router.put("/:id/update", updateBook);

module.exports = router;
