const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');
const {
  validateProductCreate,
  validateProductUpdate,
  validateProductId
} = require('../validators/productValidator');

// #swagger.tags = ['Products']
// #swagger.description = 'Get all products'
router.get('/', productsController.getAllProducts);

// #swagger.tags = ['Products']
// #swagger.description = 'Get a single product by ID'
router.get('/:id', validateProductId, productsController.getProductById);

// #swagger.tags = ['Products']
// #swagger.description = 'Create a new product'
router.post('/', validateProductCreate, productsController.createProduct);

// #swagger.tags = ['Products']
// #swagger.description = 'Update a product by ID'
router.put('/:id', validateProductId, validateProductUpdate, productsController.updateProduct);

// #swagger.tags = ['Products']
// #swagger.description = 'Delete a product by ID'
router.delete('/:id', validateProductId, productsController.deleteProduct);

module.exports = router;