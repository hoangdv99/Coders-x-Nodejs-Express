const bcrypt = require('bcryptjs');
const db = require('../db');
module.exports.getLogin = function(req, res){
    res.render('login');
}

module.exports.postLogin = function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let user = db.get('users').find({ email: email }).value();
    if (!user) {
        res.render('login', {
            error: 'User does not exist!',
            values: req.body
        });
    }
    if (user) {
        let wrongLoginCount = user.wrongLoginCount;
        if (wrongLoginCount >= 5) {
            res.render('login', {
                error: 'Login wrong than 4 times. Contact admin to unlock account!'
            });

        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result == true) {
                    res.cookie('userId', user.id, {
                        signed: true
                    });
                    res.redirect('/transactions');
                } else {
                    wrongLoginCount++;
                    res.render('login', {
                        error: 'Wrong password!'
                    });
                    db.get('users').find({ email: email }).assign({ wrongLoginCount: wrongLoginCount }).write();
                }
            });

        }
    }
}
