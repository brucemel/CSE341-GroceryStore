const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require('fs');

const swaggerPath = path.join(__dirname, '..', 'swagger-output.json');


if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = require(swaggerPath);
  router.use('/api-docs', swaggerUi.serve);
  router.get('/api-docs', swaggerUi.setup(swaggerDocument));
  console.log('✅ Swagger documentation loaded successfully');
} else {
  console.warn('⚠️ swagger-output.json not found. Swagger docs will not be available.');
  router.get('/api-docs', (req, res) => {
    res.status(503).json({ 
      error: 'Swagger documentation is not available',
      message: 'Run "npm run swagger" to generate documentation'
    });
  });
}

module.exports = router; 