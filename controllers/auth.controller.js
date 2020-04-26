const bcrypt = require('bcryptjs');
const db = require('../db');
const sgMail = require('@sendgrid/mail');
module.exports.getLogin = function (req, res) {
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
                    db.get('users').find({ email: email }).assign({ wrongLoginCount: 0 }).write();
                    res.cookie('userId', user.id, {
                        signed: true
                    });
                    res.redirect('/transactions');
                } else {
                    wrongLoginCount++;
                    if (wrongLoginCount === 3) {
                        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
                        const msg = {
                            to: user.email,
                            from: 'hoangtestemail99@gmail.com',
                            subject: 'LOGIN WRONG WARNING',
                            text: 'Someone is trying to login your account',
                            html: '<strong>Coders-X Books</strong>',
                        };
                        sgMail.send(msg)
                            .then(() => {
                            }, error => {
                                console.error(error);
                                if (error.response) {
                                    console.error(error.response.body);
                                }
                            });
                    }
                    res.render('login', {
                        error: 'Wrong password!'
                    });
                    db.get('users').find({ email: email }).assign({ wrongLoginCount: wrongLoginCount }).write();
                }
            });

        }
    }
}
