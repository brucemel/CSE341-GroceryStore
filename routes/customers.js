const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const {
  validateCustomerCreate,
  validateCustomerUpdate,
  validateCustomerId
} = require('../validators/customerValidator');
const { isAuthenticated } = require('../middleware/auth');

// GET routes (PUBLIC)
router.get('/', customersController.getAllCustomers);
router.get('/:id', validateCustomerId, customersController.getCustomerById);

// POST, PUT, DELETE routes (PROTECTED)
router.post('/', isAuthenticated, validateCustomerCreate, customersController.createCustomer);
router.put('/:id', isAuthenticated, validateCustomerUpdate, customersController.updateCustomer);
router.delete('/:id', isAuthenticated, customersController.deleteCustomer);

module.exports = router;