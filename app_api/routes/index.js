const express = require('express'); // Express app
const router = express.Router(); // Router logic
const { expressjwt } = require('express-jwt'); // Correct import

// JWT authentication middleware
const auth = expressjwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload',
  algorithms: ['HS256']
})//.unless({ path: ['/api/login', '/api/register'] }); // Exclude login & register

// Import controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication'); // Import authentication controller

// Define route for trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList) // GET Method retrieves trip list
  .post(auth, tripsController.tripsAddTrip); // POST Method Adds a Trip (protected)

// GET and PUT Method routes for tripsFindByCode - requires parameter
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode) // GET Method retrieves a single trip by tripCode
  .put(auth, tripsController.tripsUpdateTrip); // PUT Method updates a Trip (protected)

// Authentication Routes
router
  .route('/login')
  .post(authController.login); // POST Method for user login

router
  .route('/register')
  .post(authController.register); // POST Method for user registration

module.exports = router;
