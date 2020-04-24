const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactions.controller');

router.get('/', controller.getTransactions);

router.get('/create', controller.getCreateTransaction);

router.post('/create', controller.postCreateTransaction);

router.get('/:id/complete', controller.completeTransaction);

module.exports = router;