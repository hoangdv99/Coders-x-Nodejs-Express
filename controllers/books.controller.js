const db = require('../db');
const shortid = require('shortid');

module.exports.getBooks = function (req, res) {
    res.render('books', {
        books: db.get('books').value()
    });
}

module.exports.postCreateBook = function (req, res) {
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('back');
}

module.exports.deleteBook = function (req, res) {
    let id = req.params.id;
    db.get('books').remove({ id: id }).write();
    res.redirect('back');
}

module.exports.getEditBookTitle = function (req, res) {
    res.render('edit', {
        id: req.params.id
    });
}

module.exports.postEditBookTitle =  function (req, res) {
    db.get('books').find({ id: req.params.id }).assign({ title: req.body.title }).write();
    res.redirect('/books');
}

