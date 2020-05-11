const express = require("express");
const app = express();
const shortid = require("shortid");
const cookieParser = require("cookie-parser");

const connectDB = require('./config/db.js');

connectDB();

app.use(express.static('./public'))

const db = require("./db.js");

app.use(cookieParser("hieuvu thnah"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

//session
const sessionMiddleware = require('./middleware/session.js');

app.use(sessionMiddleware);

const authMiddleware = require("./middleware/auth.js");

//Router API
const authApiRoute = require('./api/Router/auth.js');
const transactionApiRoute = require('./api/Router/transaction.js');


app.use("/api/auth", authApiRoute);
app.use("/api/transactions", transactionApiRoute);

//Router
const booksRoute = require("./Routes/book.route.js");
const usersRoute = require("./Routes/user.route.js");
const transactionsRoute = require("./Routes/transaction.route.js");
const authRoute = require("./Routes/auth.route.js");
const cartRoute = require("./Routes/cart.route.js");

app.use("/", booksRoute);
app.use("/users", authMiddleware, usersRoute);
app.use("/transactions", authMiddleware, transactionsRoute);
app.use("/auth", authRoute);
app.use("/carts", cartRoute);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});