const express = require('express');
const controller = require('../controllers/travel');

const router = express.Router();

// GET travel page
router.get('/', controller.travel);

module.exports = router;
