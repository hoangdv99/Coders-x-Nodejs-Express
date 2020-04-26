const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');

//get login page
router.get('/', controller.getLogin);

//post login
router.post('/', controller.postLogin);

module.exports = router;