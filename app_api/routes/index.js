const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

console.log("Trips API route is being loaded");

// Route for retrieving all trips
router.get('/trips', tripsController.tripsList);

// Route for retrieving a single trip by tripCode
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

module.exports = router;
