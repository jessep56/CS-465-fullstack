const express = require('express');
const ctrlMain = require('../Controllers/main');
const tripsController = require('../Controllers/trips');  // Add this line

const router = express.Router();

// GET home page
router.get('/', ctrlMain.index);

// GET trips data in JSON format
router.get('/api/trips', tripsController.tripsList);  // Add this route

module.exports = router;
