const express = require("express");
const app = express();
const shortid = require("shortid");

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

app.use(express.json());
app.use(express.urlencoded({ extended: true })) ;

db.defaults({ books: [] }).write();

app.set("view engine", "pug");

app.get("/", (request, response) => {
  response.render("./index.pug");
});

//get books
app.get("/books", (req, res) => {
  const books = db.get("books").__wrapped__.books;
  res.render('books/index.pug', {
    books
  })
});

app.get('/books/create', (req, res) => {
  res.render('books/create.pug');
})

//create new book {id: , description: , title: }
app.post("/books", (req, res) => {
  const data = {
    id:shortid.generate(),
    title: req.body.title,
    des: req.body.des
  }
  
  db.get('books').push(data).write();
  res.redirect('/books');
});

//deletebookby id
app.get("/books/:id/delete", (req, res) => {
  const id = req.params.id;
  db.get('books').remove(i => i.id === id).write()
  
  res.redirect('/books');
});

//updatebookby id
app.get("/books/:id/update", (req, res) => {
  const id = req.params.id;
  
  const book = db.get('books').find({id}).value();
  
  res.render('books/update', {book})
  
});

app.put("/books/:id/update", (req, res) => {
  const id = req.params.id;
  
  const book = db.get('books').find({id}).assign.value();
  
  res.render('books/update', {book})
  
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
