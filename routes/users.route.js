const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/users.validate');
let cookieCouting = 0;
//testing cookie
router.get('/cookie', function(req, res, next){
    res.cookie('test cookie', 12345);
    res.send('hello');
  });

router.get('/', function(req, res, next){
    cookieCouting++;
    console.log(JSON.stringify(req.cookies) + ": " + cookieCouting);  
    next();
}, controller.getUsers);

//create route
router.post('/', validate.createUser, controller.postCreateUser);

//delete item
router.get('/:id/delete', controller.deleteUser);

//edit books
router.get('/:id/edit', controller.getEditUser);
router.post('/:id/edit', controller.postEditUser);


module.exports = router;