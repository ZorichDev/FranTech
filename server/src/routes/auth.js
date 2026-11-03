const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const Admin = require('../models/Admin');

const router = express.Router();
const loginLimit = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, message: { error: 'Too many sign-in attempts. Try again later.' } });

// POST /api/auth/login
router.post('/login', loginLimit, async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password || email.length > 254 || password.length > 200)
      return res.status(400).json({ error: 'Email and password required' });
    if (!process.env.JWT_SECRET)
      return res.status(503).json({ error: 'Admin authentication is not configured.' });

    const admin = await Admin.findOne({ email: email.trim().toLowerCase() });
    if (!admin)
      return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.passwordHash);
    if (!match)
      return res.status(401).json({ error: 'Invalid credentials' });

    admin.lastLogin = new Date();
    await admin.save();

    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, email: admin.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', require('../middleware/authGuard'), (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;