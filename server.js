const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const app = express();
const booksRoute = require('./routes/books.route');
const usersRoute = require('./routes/users.route');
const transactionsRoute = require('./routes/transactions.route');
const authMiddleware = require('./middlewares/authLogin.middleware');
const authRoute = require('./routes/auth.route');
//set pug engine
app.set("view engine", "pug");
app.set("views", "./views");

//body-parser middleware
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 
//for parsing cookie
app.use(cookieParser());
//books route
app.use('/books', authMiddleware.requireAuth, booksRoute);
//users route
app.use('/users', authMiddleware.requireAuth, usersRoute);
//transaction route
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
//auth route
app.use('/login', authRoute);
//static files
app.use(express.static('public'));



// listen for requests :)
app.listen(3000, () => {
  console.log("Server listening on port " + 3000);
});
