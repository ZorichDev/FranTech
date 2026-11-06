const express = require('express');
const PageView = require('../models/PageView');
const authGuard = require('../middleware/authGuard');

const rateLimit = require('express-rate-limit');

const router = express.Router();
const trackLimit = rateLimit({ windowMs: 60 * 1000, limit: 60, message: { error: 'Too many requests.' } });

// POST /api/analytics/track  — public, fires from frontend
router.post('/track', trackLimit, async (req, res) => {
  try {
    const { event, page, visitorId, referrer } = req.body || {};
    const allowedEvents = ['page_view', 'cv_download', 'hire_me_click'];
    if (!allowedEvents.includes(event))
      return res.status(400).json({ error: 'A valid event is required' });
    if (typeof visitorId !== 'string' || visitorId.length > 64)
      return res.status(400).json({ error: 'A valid visitorId is required' });

    await PageView.create({
      event,
      visitorId,
      page: typeof page === 'string' ? page.slice(0, 100) : 'home',
      referrer: typeof referrer === 'string' ? referrer.slice(0, 500) : '',
      userAgent: (req.headers['user-agent'] || '').slice(0, 500),
    });

    res.status(201).json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/analytics/summary  — admin only
router.get('/summary', authGuard, async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const [total, cvDownloads, hireMeClicks, pageViews, uniqueVisitors, uniqueCvDownloaders, recentEvents] = await Promise.all([
      PageView.countDocuments(),
      PageView.countDocuments({ event: 'cv_download' }),
      PageView.countDocuments({ event: 'hire_me_click' }),
      PageView.countDocuments({ event: 'page_view' }),
      PageView.distinct('visitorId', { event: 'page_view', visitorId: { $exists: true } }).then(ids => ids.length),
      PageView.distinct('visitorId', { event: 'cv_download', visitorId: { $exists: true } }).then(ids => ids.length),
      PageView.find({ createdAt: { $gte: sevenDaysAgo } })
        .select('event page referrer createdAt')
        .sort({ createdAt: -1 })
        .limit(50),
    ]);

    res.json({ total, cvDownloads, uniqueCvDownloaders, hireMeClicks, pageViews, uniqueVisitors, recentEvents });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;