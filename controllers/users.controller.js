const shortid = require('shortid');
const db = require('../db');

module.exports.getUsers = function (req, res) {
    res.render('users', {
        users: db.get('users').value()
    });
}

module.exports.postCreateUser = function (req, res) {
    db.get('users').push(req.body).write();
    res.redirect('/users');
}

module.exports.deleteUser = function (req, res) {
    let id = req.params.id;
    db.get('users').remove({ id: id }).write();
    res.redirect('/users');
}

module.exports.getEditUser = function (req, res) {
    res.render('edit_user', {
        id: req.params.id
    });
}

module.exports.postEditUser = function (req, res) {
    db.get('users').find({ id: req.params.id }).assign({ username: req.body.username }).value();
    res.redirect('/users');
}