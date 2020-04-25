const md5 = require('md5');
const shortid = require('shortid');
const db = require('../db')

module.exports.createUser = function(req, res, next){
    let errors = [];
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    
    if(!username){
        errors.push('Username is required!');
    }
    if(!email){
        errors.push('Email is required!');
    }
    if(!password){
        errors.push('Password is required!');
    }
    if(db.get('users').find({ username: username}).value()){
        errors.push('Username is existing!');
    }
    if(db.get('users').find({ email: email}).value()){
        errors.push('Email is existing!');
    }
    if(password !== confirmPassword){
        errors.push('Please reconfirm password!');
    }
    if(username.length > 30){
        errors.push("User name cannot be more than 30 character!");
    }
    if(errors.length){
        res.render('create_user', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}
