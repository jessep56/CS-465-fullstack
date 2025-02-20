const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport'); // Added Passport import
require('dotenv').config(); // Load environment variables

// Import database connection
require('./app_api/models/db');
require('./app_api/config/passport'); // Initialize Passport

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

// Import API router
const apiRouter = require('./app_api/routes/index');

const app = express();

// Set up Handlebars with layout support
app.engine('hbs', exphbs.engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'app_server', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Middleware
app.use(morgan('dev')); // Logs requests
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded bodies
app.use(cookieParser()); // Parses cookies
app.use(express.static(path.join(__dirname, 'public'))); // Serves static files
app.use(passport.initialize()); // Initialize Passport

// Enable CORS
app.use('/api', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Define routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);
app.use('/api', apiRouter); // Register API routes

// Catch unauthorized error and return 401 response
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ message: err.name + ": " + err.message });
    }
});

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { message: err.message });
});

app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`Registered route: ${r.route.path}`);
    }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
