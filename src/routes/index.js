const express = require('express');
const router = express.Router();
const controllers = require('../controllers');
const middlewars = require('../middlewars');
const validationSchemas = require('../utils/validation-schemas')

router.get('/ping', controllers.getPing);
router.post('/amount', middlewars.validate(validationSchemas.createTransaction), controllers.createTransaction);
router.get('/transaction/:transaction_id', controllers.getTranscation);
router.get('/balance/:account_id', controllers.getAccountBalnace);
router.get('/max_transaction_volume', controllers.getMaxTransactionVolume);

module.exports = router;