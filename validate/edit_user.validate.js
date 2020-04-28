const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });
const db = require('../db')

module.exports.createUser = function(req, res, next){
    let errors = [];
    let newUsername = req.body.username;
    let newEmail = req.body.email;
    let newPassword = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    
    if(!newUsername){
        errors.push('Username is required!');
    }
    if(!newEmail){
        errors.push('Email is required!');
    }
    if(!newPassword){
        errors.push('Password is required!');
    }
    if(db.get('users').find({ username: newUsername}).value()){
        errors.push('Username is existing!');
    }
    if(db.get('users').find({ email: newEmail}).value()){
        errors.push('Email is existing!');
    }
    if(password !== confirmPassword){
        errors.push('Please reconfirm password!');
    }
    if(newUsername.length > 30){
        errors.push("User name cannot be more than 30 character!");
    }
    if(errors.length){
        res.render('edit_user', {
            errors: errors,
            values: req.body
        });
        return;
    }
    next();
}
