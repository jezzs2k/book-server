const router = require("express").Router();

const {
  getBook,
  getCreateBook,
  postCreateBook,
  deleteBook,
  getUpdateBook,
  postUpdateBook
} = require("../Controllers/book.controller.js");

//get books
router.get("/", getBook);

//get from create book
router.get("/create", getCreateBook);

//create new book {id: , description: , title: }
router.post("/", postCreateBook);

//deletebookby id
router.get("/:id/delete", deleteBook);

//updatebookby id
router.get("/:id/update", getUpdateBook);

//post update books
router.post("/:id/update", postUpdateBook);

module.exports = router;
