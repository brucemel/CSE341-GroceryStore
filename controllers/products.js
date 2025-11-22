const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');
const { validationResult } = require('express-validator');

const DB_NAME = 'groceryStore';
const COLLECTION_NAME = 'products';

// ========================================
// GET ALL PRODUCTS
// ========================================
const getAllProducts = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .find()
      .toArray();
    
    res.status(200).json({
      success: true,
      count: result.length,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// GET SINGLE PRODUCT
// ========================================
const getProductById = async (req, res, next) => {
  try {
    // Validar ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }

    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .findOne({ _id: productId });
    
    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// CREATE PRODUCT
// ========================================
const createProduct = async (req, res, next) => {
  try {
    // Validar datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const product = {
      name: req.body.name,
      category: req.body.category,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      unit: req.body.unit,
      supplier: req.body.supplier,
      description: req.body.description || '',
      expirationDate: req.body.expirationDate || null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .insertOne(product);
    
    if (!result.acknowledged) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create product'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: {
        _id: result.insertedId,
        ...product
      }
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// UPDATE PRODUCT
// ========================================
const updateProduct = async (req, res, next) => {
  try {
    // Validar ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }

    // Validar datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const productId = new ObjectId(req.params.id);
    
    // Construir objeto de actualización solo con campos presentes
    const updateData = {
      updatedAt: new Date()
    };
    
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.category) updateData.category = req.body.category;
    if (req.body.price) updateData.price = parseFloat(req.body.price);
    if (req.body.stock !== undefined) updateData.stock = parseInt(req.body.stock);
    if (req.body.unit) updateData.unit = req.body.unit;
    if (req.body.supplier) updateData.supplier = req.body.supplier;
    if (req.body.description !== undefined) updateData.description = req.body.description;
    if (req.body.expirationDate !== undefined) updateData.expirationDate = req.body.expirationDate;

    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: productId },
        { $set: updateData }
      );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    next(error);
  }
};

// ========================================
// DELETE PRODUCT
// ========================================
const deleteProduct = async (req, res, next) => {
  try {
    // Validar ID
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid product ID format'
      });
    }

    const productId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db(DB_NAME)
      .collection(COLLECTION_NAME)
      .deleteOne({ _id: productId });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};