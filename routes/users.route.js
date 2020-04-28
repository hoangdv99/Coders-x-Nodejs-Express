const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/users.controller');
const validate = require('../validate/users.validate');
const authMiddleware = require('../middlewares/authLogin.middleware');
const upload = multer({ dest: './public/uploads/' });
router.get('/', authMiddleware.requireAuth, controller.getUsers);
//get create
router.get('/create', controller.getCreateUser);
//post create route
router.post('/create', validate.createUser, controller.postCreateUser);
//delete item
router.get('/:id/delete', authMiddleware.requireAuth,controller.deleteUser);
//edit users
router.get('/:id/profile', authMiddleware.requireAuth, controller.getEditUser);
router.post('/:id/profile', upload.single('avatar'), authMiddleware.requireAuth, controller.postEditUser);
//profile

module.exports = router;