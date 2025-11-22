const { body, param } = require('express-validator');

// ALLOWED CATEGORIES

const ALLOWED_CATEGORIES = [
  'Fruits',
  'Vegetables',
  'Dairy',
  'Meat',
  'Poultry',
  'Seafood',
  'Bakery',
  'Beverages',
  'Snacks',
  'Frozen',
  'Canned',
  'Grains',
  'Pasta',
  'Condiments',
  'Spices',
  'Cleaning',
  'Household',
  'Personal Care',
  'Baby',
  'Pet Food'
];

// ALLOWED UNITS

const ALLOWED_UNITS = [
  'kg',      // kilogram
  'g',       // gram
  'lb',      // pound
  'oz',      // ounce
  'l',       // liter
  'ml',      // milliliter
  'gal',     // gallon
  'unit',    // unit
  'pack',    // package
  'box',     // box
  'bag',     // bag
  'can',     // can
  'bottle',  // bottle
  'jar'      // jar
];

// CREATE PRODUCT VALIDATOR

const validateProductCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(ALLOWED_CATEGORIES)
    .withMessage(`Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(', ')}`),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  
  body('unit')
    .trim()
    .notEmpty().withMessage('Unit is required')
    .isIn(ALLOWED_UNITS)
    .withMessage(`Invalid unit. Allowed: ${ALLOWED_UNITS.join(', ')}`),
  
  body('supplier')
    .trim()
    .notEmpty().withMessage('Supplier is required')
    .isLength({ min: 3 }).withMessage('Supplier name must be at least 3 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('expirationDate')
    .optional()
    .isISO8601().withMessage('Invalid date format. Use YYYY-MM-DD')
];

// UPDATE PRODUCT VALIDATOR

const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('category')
    .optional()
    .trim()
    .isIn(ALLOWED_CATEGORIES)
    .withMessage(`Invalid category. Allowed: ${ALLOWED_CATEGORIES.join(', ')}`),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  
  body('unit')
    .optional()
    .trim()
    .isIn(ALLOWED_UNITS)
    .withMessage(`Invalid unit. Allowed: ${ALLOWED_UNITS.join(', ')}`),
  
  body('supplier')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('Supplier name must be at least 3 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  
  body('expirationDate')
    .optional()
    .isISO8601().withMessage('Invalid date format. Use YYYY-MM-DD')
];

// PRODUCT ID VALIDATOR

const validateProductId = [
  param('id')
    .isLength({ min: 24, max: 24 }).withMessage('Invalid product ID format')
];

module.exports = {
  validateProductCreate,
  validateProductUpdate,
  validateProductId,
  ALLOWED_CATEGORIES,  // Export for use in other files
  ALLOWED_UNITS        // Export for use in other files
};