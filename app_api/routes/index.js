const express = require('express'); // Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// Define route for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList) // GET Method retrieves trip list
  .post(tripsController.tripsAddTrip); // POST Method Adds a Trip

// GET and PUT Method routes for tripsFindByCode - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode) // GET Method retrieves a single trip by tripCode
  .put(tripsController.tripsUpdateTrip); // PUT Method updates a Trip

module.exports = router;
