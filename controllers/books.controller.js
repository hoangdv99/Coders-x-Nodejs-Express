const db = require('../db');
const shortid = require('shortid');

module.exports.getBooks = function (req, res) {
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    let start = (page - 1) * perPage;
    let end = page * perPage;
    res.render('books', {
        current: page,
        pages: Math.ceil(db.get('books').size().value() / perPage),
        books: db.get('books').value().slice(start, end)
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

