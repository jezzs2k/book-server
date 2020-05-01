const router = require("express").Router();

const {
  getTransactions,
  getCreateTransaction,
  postCreateTransaction,
  complete
} = require("../Controllers/transaction.controller.js");

//get transaction
router.get("/", getTransactions);

//get form transaction
router.get("/create", getCreateTransaction);

//post transaction
router.post("/create", postCreateTransaction);

router.get("/:id/complete", complete);

module.exports = router;
