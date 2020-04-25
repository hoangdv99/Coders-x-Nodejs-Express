const express = require('express');
const router = express.Router();
const controller = require('../controllers/users.controller');
const validate = require('../validate/users.validate');
const authMiddleware = require('../middlewares/authLogin.middleware');

router.get('/', authMiddleware.requireAuth, controller.getUsers);
//get create
router.get('/create', controller.getCreateUser);
//post create route
router.post('/create', validate.createUser, controller.postCreateUser);
//delete item
router.get('/:id/delete', authMiddleware.requireAuth,controller.deleteUser);
//edit books
router.get('/:id/edit', authMiddleware.requireAuth, controller.getEditUser);
router.post('/:id/edit', authMiddleware.requireAuth, controller.postEditUser);

module.exports = router;