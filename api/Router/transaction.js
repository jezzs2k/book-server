const router = require("express").Router();

const { getTransactions } = require("../Controllers/transaction.controller.js");

//get transaction
router.get("/", getTransactions);

module.exports = router;
