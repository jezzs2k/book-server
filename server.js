const express = require("express");
const app = express();
const shortid = require("shortid");

const db = require("./db.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.get("/", (request, response) => {
  response.render("./index.pug");
});

//Router
const booksRoute = require('./Routes/book.route.js');

app.use('/books', booksRoute);


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
