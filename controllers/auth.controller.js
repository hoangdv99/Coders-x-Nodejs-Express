const db = require('../db');
module.exports.getLogin = function(req, res){
    res.render('login');
}

module.exports.postLogin = function(req, res){
    let errors = [];
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({ email: email}).value();
    
    if(!user){
        errors.push('Wrong username or password.');
    }
    if(user){
        if(user.password !== password)
            errors.push('Wrong username or password.');
    }
    if(errors.length){
        res.render('login', {
            errors: errors,
            values: req.body
        });
        return;
    }
    res.cookie('userId', user.id);
    res.redirect('/transactions');
}