const { body, param } = require('express-validator');

//create a product validator

const validateProductCreate = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('category')
    .trim()
    .notEmpty().withMessage('Category is required')
    .isIn(['Frutas', 'Verduras', 'Lácteos', 'Carnes', 'Panadería', 'Bebidas', 'Snacks', 'Limpieza'])
    .withMessage('Invalid category'),
  
  body('price')
    .notEmpty().withMessage('Price is required')
    .isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  
  body('stock')
    .notEmpty().withMessage('Stock is required')
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  
  body('unit')
    .trim()
    .notEmpty().withMessage('Unit is required')
    .isIn(['kg', 'g', 'l', 'ml', 'unidad', 'paquete', 'caja'])
    .withMessage('Invalid unit'),
  
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

//Refresh product validator

const validateProductUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Name must be between 3 and 100 characters'),
  
  body('category')
    .optional()
    .trim()
    .isIn(['Frutas', 'Verduras', 'Lácteos', 'Carnes', 'Panadería', 'Bebidas', 'Snacks', 'Limpieza'])
    .withMessage('Invalid category'),
  
  body('price')
    .optional()
    .isFloat({ min: 0.01 }).withMessage('Price must be greater than 0'),
  
  body('stock')
    .optional()
    .isInt({ min: 0 }).withMessage('Stock must be a positive integer'),
  
  body('unit')
    .optional()
    .trim()
    .isIn(['kg', 'g', 'l', 'ml', 'unidad', 'paquete', 'caja'])
    .withMessage('Invalid unit'),
  
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

//ID validator

const validateProductId = [
  param('id')
    .isLength({ min: 24, max: 24 }).withMessage('Invalid product ID format')
];

module.exports = {
  validateProductCreate,
  validateProductUpdate,
  validateProductId
};