const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Grocery Store API',
    description: 'Complete CRUD API for a grocery store with products and customers management'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);