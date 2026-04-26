const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Step 1 — Redirect to Google
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Step 2 — Google calls back here
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'https://event-hive-one-gules.vercel.app/login',
    session: false
  }),
  (req, res) => {
    const token = generateToken(req.user._id);

    const userData = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      token
    };

    res.redirect(
      `https://event-hive-one-gules.vercel.app/auth/success?data=${encodeURIComponent(JSON.stringify(userData))}`
    );
  }
);

module.exports = router;