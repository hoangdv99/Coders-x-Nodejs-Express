const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const booksRoute = require('./routes/books.route');
const usersRoute = require('./routes/users.route');
const transactionsRoute = require('./routes/transactions.route');
//set pug engine
app.set("view engine", "pug");
app.set("views", "./views");

//body-parser middleware
// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

//books route
app.use('/books', booksRoute);
//users route
app.use('/users', usersRoute);
//transaction route
app.use('/transactions', transactionsRoute);

//static files
app.use(express.static('public'));

// listen for requests :)
app.listen(3000, () => {
  console.log("Server listening on port " + 3000);
});
