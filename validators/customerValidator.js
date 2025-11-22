const { body, param } = require('express-validator');

// CREATE CUSTOMER VALIDATOR (POST)

const validateCustomerCreate = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('First name can only contain letters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Last name can only contain letters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .matches(/^\+?[\d\s\-()]+$/).withMessage('Invalid phone number format')
    .isLength({ min: 7, max: 20 }).withMessage('Phone must be between 7 and 20 characters'),
  
  body('address')
    .trim()
    .notEmpty().withMessage('Address is required')
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),
  
  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ min: 2, max: 50 }).withMessage('City must be between 2 and 50 characters'),
  
  body('postalCode')
    .optional()
    .trim()
    .matches(/^\d{5}$/).withMessage('Postal code must be 5 digits')
];

// UPDATE CUSTOMER VALIDATOR (PUT)

const validateCustomerUpdate = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('First name can only contain letters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Last name can only contain letters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail().withMessage('Must be a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^\+?[\d\s\-()]+$/).withMessage('Invalid phone number format')
    .isLength({ min: 7, max: 20 }).withMessage('Phone must be between 7 and 20 characters'),
  
  body('address')
    .optional()
    .trim()
    .isLength({ min: 10, max: 200 }).withMessage('Address must be between 10 and 200 characters'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 }).withMessage('City must be between 2 and 50 characters'),
  
  body('postalCode')
    .optional()
    .trim()
    .matches(/^\d{5}$/).withMessage('Postal code must be 5 digits')
];

// CUSTOMER ID VALIDATOR

const validateCustomerId = [
  param('id')
    .isLength({ min: 24, max: 24 }).withMessage('Invalid customer ID format')
];

module.exports = {
  validateCustomerCreate,
  validateCustomerUpdate,
  validateCustomerId
};