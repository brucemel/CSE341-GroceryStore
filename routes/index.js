const express = require('express');
const router = express.Router();

// Ruta raíz - Información de la API
router.get('/', (req, res) => {
  //#swagger.tags=['CSE 341 - Contacts API']
  res.send('CSE 341 - GroceryStore API');
});

// Rutas de productos
router.use('/products', require('./products'));

// Rutas de clientes
router.use('/customers', require('./customers'));

module.exports = router;