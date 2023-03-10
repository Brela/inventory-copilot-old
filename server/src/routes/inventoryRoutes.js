const express = require('express');
const inventory = require('../controllers/inventory');
const router = express.Router();
// const authController = require('../controllers/')
const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getInventoryList);
router.get('/:id', inventoryController.getInventoryItem);

router.post('/', inventoryController.createInventoryItem);
router.post('/bulk', inventoryController.createManyInventoryItems);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', inventoryController.updateInventoryItem);

router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;
