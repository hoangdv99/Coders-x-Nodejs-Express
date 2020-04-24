const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');

router.get('/', controller.getUsers);

//create route
router.post('/', controller.postCreateUser);

//delete item
router.get('/:id/delete', controller.deleteUser);

//edit books
router.get('/:id/edit', controller.getEditUser);
router.post('/:id/edit', controller.postEditUser);

module.exports = router;