const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Import database connection (UPDATED PATH)
require('./app_api/models/db');

const indexRouter = require('./app_server/routes/index');
const travelRouter = require('./app_server/routes/travel');

// Import API router (NEW)
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

// Define routes
app.use('/', indexRouter);
app.use('/travel', travelRouter);

// Register API routes (NEW)
app.use('/api', apiRouter);

// Error handling for 404
app.use((req, res, next) => {
    res.status(404).render('error', { message: 'Page Not Found' });
});

// General error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { message: err.message });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
