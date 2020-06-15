const express = require('express');
const app = express();
const cors = require('cors');
const exphbs = require('express-handlebars');

const connectDB = require('./config/db.js');
connectDB();

app.use(express.static('./public'));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

require('dotenv').config();

//Router API
const authRoute = require('./api/Router/auth.route');
const transactionRoute = require('./api/Router/transaction.route');
const bookRoute = require('./api/Router/book.route');
const storeRoute = require('./api/Router/store.route');
// const userApiRoute = require('./api/Router/user');

app.use('/api/auth', authRoute);
app.use('/api/transactions', transactionRoute);
app.use('/api/books', bookRoute);
app.use('/api/store', storeRoute);
// app.use('/api/users', userApiRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
