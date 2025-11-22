const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const {
  validateProductCreate,
  validateProductUpdate,
  validateProductId
} = require('../validators/productValidator');

router.get('/', productsController.getAllProducts);

router.get('/:id', validateProductId, productsController.getProductById);

router.post('/', validateProductCreate, productsController.createProduct);

router.put('/:id', validateProductId, validateProductUpdate, productsController.updateProduct);

router.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = router;