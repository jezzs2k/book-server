const router = require("express").Router();
const shortid = require("shortid");

const db = require("../db.js");

//get transaction
router.get("/", (req, res) => {
  const transactions = db.get("transaction").value();
  
  res.render("transaction/index.pug", {
    transactions
  });
});

module.exports = router;