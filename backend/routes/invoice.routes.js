const { Router } = require('express')
const { createInvoice } = require('../controllers/invoice.controller');

const router = Router();

router.post('/invoices', createInvoice)

module.exports = router;