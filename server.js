const express = require("express");
const app = express();
const shortid = require("shortid");
const cookieParser = require("cookie-parser");
const sgMail = require("@sendgrid/mail");

const db = require("./db.js");

app.use(cookieParser("hieuvu thnah"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("./index.pug");
});

//test sendGrid
sgMail.setApiKey(process.env.ENDGRID_API_KEY);
const msg = {
  to: "vuthanhhieu00@gmail.com",
  from: "vuthanhhieu00@gmail.com",
  subject: "send with senGrid but just is test for fun",
  text: "hello friend, you want acceppt gmail",
  html: "<strong>hello friend, you want acceppt gmail</strong>"
};

sgMail.send(msg);

const authMiddleware = require("./middleware/auth.js");

//Router
const booksRoute = require("./Routes/book.route.js");
const usersRoute = require("./Routes/user.route.js");
const transactionsRoute = require("./Routes/transaction.route.js");
const authRoute = require("./Routes/auth.route.js");

app.use("/books", authMiddleware, booksRoute);
app.use("/users", authMiddleware, usersRoute);
app.use("/transactions", authMiddleware, transactionsRoute);
app.use("/auth", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
