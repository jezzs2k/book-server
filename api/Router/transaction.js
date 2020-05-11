const router = require("express").Router();

const { getTransactions, createTransaction, complete } = require("../Controllers/transaction.controller.js");

//get transaction
router.get("/", getTransactions);
router.post("/", createTransaction);
router.put("/:id/complete", complete);

module.exports = router;
