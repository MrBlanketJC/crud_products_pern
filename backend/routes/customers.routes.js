const { Router } =  require('express')
const { getCustomers, getCustomerByID, updateCustomer, deleteCustomer, createCustomer, checkDuplicateCustomer } = require('../controllers/customers.controller')

const router = Router();

router.get('/customers', getCustomers);
router.get('/customers/:id', getCustomerByID)
router.post('/customers', createCustomer)
router.put('/customers/:id', updateCustomer)
router.delete('/customers/:id', deleteCustomer)
router.get("/customers/check-duplicate/:documentcustomer", checkDuplicateCustomer); // Nueva ruta para validar duplicados

module.exports = router;