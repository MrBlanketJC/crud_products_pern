const { Router } = require('express')
const { getAllProducts, getProductByID, createProdut, updateProduct, deleteProduct } = require('../controllers/products.controller')

const router = Router();

router.get('/products', getAllProducts)
router.get('/products/:id', getProductByID)
router.post('/products', createProdut)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)


module.exports = router;