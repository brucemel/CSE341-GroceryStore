const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Grocery Store API',
    description: 'CSE 341 Project 2 - Complete CRUD API for a grocery store with products and customers management',
    version: '1.0.0',
    contact: {
      name: 'Tu Nombre',
      email: 'tu-email@byui.edu'
    }
  },
  // ⭐ CAMBIO AQUÍ - Detectar si es local o producción
  host: process.env.HOST || 'localhost:3000',
  schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http'], // ⬅️ http para local
  tags: [
    {
      name: 'Products',
      description: 'Endpoints for managing grocery products'
    },
    {
      name: 'Customers',
      description: 'Endpoints for managing customers'
    }
  ],
  definitions: {
    Product: {
      name: 'Manzana Roja',
      category: 'Frutas',
      price: 3.50,
      stock: 100,
      unit: 'kg',
      supplier: 'Frutas del Valle',
      description: 'Manzanas rojas frescas y jugosas',
      expirationDate: '2024-12-31'
    },
    Customer: {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan.perez@email.com',
      phone: '+51 987654321',
      address: 'Av. América 123',
      city: 'Trujillo',
      postalCode: '13001'
    }
  }
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('✅ Swagger documentation generated successfully');
  console.log('📄 File: swagger-output.json');
});