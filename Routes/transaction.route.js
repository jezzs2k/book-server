const router = require("express").Router();
const shortid = require("shortid");

const db = require("../db.js");

//get transaction
router.get("/", (req, res) => {
  const transaction = db.get("transaction").value();
  
  res.render("transaction/index.pug", {
    transaction
  });
});

module.exports = router;