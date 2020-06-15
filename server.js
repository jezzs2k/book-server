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
const authApiRoute = require('./api/Router/auth.js');
// const transactionApiRoute = require('./api/Router/transaction.js');
const bookApiRoute = require('./api/Router/book.js');
// const userApiRoute = require('./api/Router/user.js');
// const sessionApiRoute = require('./api/Router/session.js');

app.use('/api/auth', authApiRoute);
// app.use('/api/transactions', transactionApiRoute);
app.use('/api/books', bookApiRoute);
// app.use('/api/users', userApiRoute);
// app.use('/api/carts', sessionApiRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
