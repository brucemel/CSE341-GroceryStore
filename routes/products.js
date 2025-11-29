const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const {
  validateProductCreate,
  validateProductUpdate,
  validateProductId
} = require('../validators/productValidator');
const { isAuthenticated } = require('../middleware/auth');

// GET routes (PUBLIC)
router.get('/', productsController.getAllProducts);
router.get('/:id', validateProductId, productsController.getProductById);

// POST, PUT, DELETE routes (PROTECTED)
router.post('/', isAuthenticated, validateProductCreate, productsController.createProduct);
router.put('/:id', isAuthenticated, validateProductUpdate, productsController.updateProduct);
router.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = router;