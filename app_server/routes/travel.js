const express = require('express');
const router = express.Router();
const travelController = require('../Controllers/travel');

if (!travelController.travelList) {
    console.error("Error: travelList function is not defined in travelController");
}

// Define the travel route
router.get('/', travelController.travelList);

module.exports = router;
