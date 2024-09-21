const express = require('express');
const { addProduct, getMyProducts, getAllProducts } = require('../controllers/productControllers');
const { authenticate } = require('../controllers/productControllers');

const router = express.Router();

router.post('/add', authenticate, addProduct);
router.get('/my-products', authenticate, getMyProducts);
router.get('/all-products', getAllProducts);

module.exports = router;
