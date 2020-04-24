const express = require('express');
const router = express.Router();

const controller = require('../controllers/books.controller');

router.get('/', controller.getBooks);

//create route
router.post('/create', controller.postCreateBook);

//delete item
router.get('/:id/delete', controller.deleteBook);

//edit books
router.get('/:id/edit', controller.getEditBookTitle);
router.post('/:id/edit', controller.postEditBookTitle);

module.exports = router;