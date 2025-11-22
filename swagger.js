const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Grocery Store API',
    description: 'Complete CRUD API for a grocery store with products and customers management'
  },
  host: 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger-output.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully');
}).catch(err => {
  console.error('Error generating swagger:', err);
});