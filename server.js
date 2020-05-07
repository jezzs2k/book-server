const express = require("express");
const app = express();
const shortid = require("shortid");

const db = require("./db.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("./index.pug");
});

//Router
const booksRoute = require("./Routes/book.route.js");
const usersRoute = require("./Routes/user.route.js");
const transactionsRoute = require("./Routes/transaction.route.js");
const authRoute = require('./Routes/auth.route.js');

app.use("/books", booksRoute);
app.use("/users", usersRoute);
app.use("/transactions", transactionsRoute);
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
