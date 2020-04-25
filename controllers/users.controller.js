const shortid = require('shortid');
const md5 = require('md5');
const db = require('../db');

module.exports.getUsers = function (req, res) {
    res.render('users', {
        users: db.get('users').value()
    }); 
}

module.exports.getCreateUser = function(req, res){
    res.render('create_user', {
        errors: []
    });
}

module.exports.postCreateUser = function (req, res) {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let hashedPassword = md5(password);
    
    db.get('users').push({ id: shortid.generate(),
                           username: username,
                           email: email,
                           password: hashedPassword}).write();
    res.redirect('/login');
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