const { Router } =  require('express')
const { getCustomers } = require('../controllers/customers.controller')

const router = Router();

router.get('/customers', getCustomers);

module.exports = router;