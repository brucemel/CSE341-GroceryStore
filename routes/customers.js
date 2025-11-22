const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');
const {
  validateCustomerCreate,
  validateCustomerUpdate,
  validateCustomerId
} = require('../validators/customerValidator');

router.get('/', customersController.getAllCustomers);

router.get('/:id', validateCustomerId, customersController.getCustomerById);

router.post('/', validateCustomerCreate, customersController.createCustomer);

router.put('/:id', validateCustomerId, validateCustomerUpdate, customersController.updateCustomer);

router.delete('/:id', validateCustomerId, customersController.deleteCustomer);

module.exports = router;