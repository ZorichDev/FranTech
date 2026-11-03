const express = require('express');
const AdminActivity = require('../models/AdminActivity');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  try {
    const activities = await AdminActivity.find()
      .sort({ createdAt: -1 })
      .limit(30)
      .lean();
    res.json(activities);
  } catch {
    res.status(500).json({ error: 'Administrative activity could not be loaded.' });
  }
});

module.exports = router;