require('dotenv').config();

const express = require('express');
const mongodb = require('./data/database');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;


// MIDDLEWARE

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Logging (desarrollo)
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// Database Start

mongodb.initDb((err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
    process.exit(1);
  } else {
    console.log('✅ Database connected successfully');
    
    // Documentación Swagger
    app.use('/api-docs', require('./routes/swagger'));
    
    // principal routes
    app.use('/', require('./routes'));
    
    // Middleware errors
    app.use(errorHandler);
    
    // Start Server.
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
      console.log(`API Docs: http://localhost:${port}/api-docs`);
    });
  }
});