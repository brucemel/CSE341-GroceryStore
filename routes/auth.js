const express = require('express');
const passport = require('passport');
const router = express.Router();

// @access  Public
router.get('/github', 
  passport.authenticate('github', { scope: ['user:email'] })
);

// @access  Public
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login-failed' }),
  (req, res) => {
    // Successful authentication
    res.redirect('/auth/success');
  }
);

// @access  Private
router.get('/success', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login-failed');
  }
  
  res.send(`Logged in as ${req.user.username}`);
});

// @access  Public
router.get('/login-failed', (req, res) => {
  res.status(401).json({
    success: false,
    error: 'Authentication failed',
    message: 'Unable to authenticate with GitHub'
  });
});

// @access  Private
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: 'Logout error',
        message: err.message
      });
    }
    
    res.json({
      success: true,
      message: 'Successfully logged out'
    });
  });
});

// @access  Private
router.get('/user', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      error: 'Not authenticated',
      message: 'No user logged in'
    });
  }
  
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;