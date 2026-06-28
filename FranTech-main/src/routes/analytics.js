const express = require('express');
const PageView = require('../models/PageView');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

// POST /api/analytics/track  — public, fires from frontend
router.post('/track', async (req, res) => {
  try {
    const { event, page } = req.body;
    if (!event) return res.status(400).json({ error: 'event is required' });

    await PageView.create({
      event,
      page: page || 'home',
      userAgent: req.headers['user-agent'] || '',
      ip: req.ip,
    });

    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/analytics/summary  — admin only
router.get('/summary', authGuard, async (req, res) => {
  try {
    const total        = await PageView.countDocuments();
    const cvDownloads  = await PageView.countDocuments({ event: 'cv_download' });
    const hireMeClicks = await PageView.countDocuments({ event: 'hire_me_click' });
    const pageViews    = await PageView.countDocuments({ event: 'page_view' });

    // Last 7 days activity
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentEvents = await PageView.find({ createdAt: { $gte: sevenDaysAgo } })
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ total, cvDownloads, hireMeClicks, pageViews, recentEvents });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;