const { Router } = require('express')
const { getInvoice, getInvoiceByID } = require('../controllers/invoice.controller');

const router = Router();

router.get('/invoices', getInvoice)
router.get('/invoices/:id', getInvoiceByID)

module.exports = router;