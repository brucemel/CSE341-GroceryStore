const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const {
  validateCustomerCreate,
  validateCustomerUpdate,
  validateCustomerId
} = require('../validators/customerValidator');

// #swagger.tags = ['Customers']
// #swagger.description = 'Get all customers'
router.get('/', customersController.getAllCustomers);

// #swagger.tags = ['Customers']
// #swagger.description = 'Get a single customer by ID'
router.get('/:id', validateCustomerId, customersController.getCustomerById);

// #swagger.tags = ['Customers']
// #swagger.description = 'Create a new customer'
router.post('/', validateCustomerCreate, customersController.createCustomer);

// #swagger.tags = ['Customers']
// #swagger.description = 'Update a customer by ID'
router.put('/:id', validateCustomerId, validateCustomerUpdate, customersController.updateCustomer);

// #swagger.tags = ['Customers']
// #swagger.description = 'Delete a customer by ID'
router.delete('/:id', validateCustomerId, customersController.deleteCustomer);

module.exports = router;