const shortid = require('shortid');
const db = require('../db')

module.exports.createUser = function(req, res, next){
    let errors = [];
    let username = req.body.username;
    req.body.id = shortid.generate();
    if(username.length > 30){
        errors.push("User name cannot be more than 30 character!");
    }
    if(errors.length){
        res.render('users', {
            errors: errors,
            users: db.get('users').value()
        });
        return;
    }
    next();
}