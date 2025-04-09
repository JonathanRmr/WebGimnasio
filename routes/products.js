const express = require('express');
const router = express.Router();
const validateToken = require('../middlewares/validate-token');
const productController = require('../controllers/productController');

// Rutas públicas
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Rutas protegidas
router.put('/:id/inventory', validateToken, productController.updateInventory);
router.post('/', validateToken, productController.createProduct);

module.exports = router;    