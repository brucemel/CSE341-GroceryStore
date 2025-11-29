const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const { initDb, getDatabase } = require('./data/database');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===========================================
// MIDDLEWARE CONFIGURATION
// ===========================================

// CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration (BEFORE Passport)
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-this',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Passport initialization (AFTER Session)
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ===========================================
// ROUTES
// ===========================================

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Grocery Store API');
});

// Shortcut routes - direct access without /auth prefix
app.get('/login', 
  require('passport').authenticate('github', { scope: ['user:email'] })
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Logout error');
    }
    
    res.send('Logged out');
  });
});

// Authentication routes
app.use('/auth', require('./routes/auth'));

// API routes
app.use('/', require('./routes'));

// Swagger documentation
app.use('/', require('./routes/swagger'));

// Error handling (ALWAYS AT THE END)
app.use(errorHandler);

// ===========================================
// DATABASE & SERVER INITIALIZATION
// ===========================================

const startServer = () => {
  // Initialize database
  initDb((err) => {
    if (err) {
      console.error('❌ Database connection error:', err);
      process.exit(1);
    }

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API Docs: http://localhost:${PORT}/api-docs`);
      console.log(`Login: http://localhost:${PORT}/login`);
    });
  });
};

startServer();

module.exports = app;