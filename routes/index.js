const express = require('express');
const router = express.Router();

// Information API
router.get('/', (req, res) => {
  //#swagger.tags=['CSE 341 - Contacts API']
  res.send('CSE 341 - GroceryStore API');
});

router.use('/products', require('./products'));

router.use('/customers', require('./customers'));

module.exports = router;