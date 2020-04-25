const shortid = require('shortid');
const db = require('../db');

module.exports.getTransactions = function(req, res){
    res.render('transactions', {
        transactions: db.get('transactions').value(),
        user: db.get('users').find({id: req.cookies.userId}).value()
    });
}

module.exports.getCreateTransaction = function(req, res){
    res.render('create_transaction', {
        users: db.get('users').value(),
        books: db.get('books').value()
    });
}

module.exports.postCreateTransaction = function(req, res){
    let user = db.get('users').find({ id: req.cookies.userId}).value();

    db.get('transactions').push({ id: shortid.generate(),
                                  isCompleted: false,
                                  username: user.username,
                                  bookTitle: req.body.bookTitle}).write();
    res.redirect('/transactions');
}

module.exports.completeTransaction = function(req, res){
    let id = req.params.id;
    db.get('transactions').find({ id: id}).assign({ isCompleted: true}).value();
    res.redirect('/transactions');
}