const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  //Validation error (Document do not follow the schema)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: err.message,
      details: err.errors
    });
  }

  // MongoDB error (duplicate key error)
  if (err.name === 'MongoServerError') {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate Error',
        message: 'Resource already exists'
      });
    }
  }

  // ObjectId invalid (error)
  if (err.name === 'BSONError') {
    return res.status(400).json({
      success: false,
      error: 'Invalid ID',
      message: 'Invalid MongoDB ObjectId format'
    });
  }

  // Error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;