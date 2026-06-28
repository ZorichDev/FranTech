const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const Message = require('../models/Message');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

// Rate limit: max 5 contact form submissions per IP per hour
const contactLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages sent. Try again in an hour.' },
});

// Nodemailer transporter using Gmail App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// POST /api/contact  — public, rate-limited
router.post('/', contactLimit, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ error: 'Name, email and message are required' });

    // 1. Save to MongoDB
    const saved = await Message.create({ name, email, subject, message });

    // 2. Send email notification to you
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `📨 New message from ${name}: ${subject || 'Portfolio Inquiry'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#e94560">New Portfolio Message</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px;font-weight:bold;color:#666">From</td><td style="padding:8px">${name}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#666">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#666">Subject</td><td style="padding:8px">${subject || 'No subject'}</td></tr>
            <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold;color:#666">Message</td><td style="padding:8px">${message}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;color:#666">Sent at</td><td style="padding:8px">${new Date().toLocaleString()}</td></tr>
          </table>
          <p style="margin-top:24px">
            <a href="mailto:${email}" style="background:#e94560;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none">Reply to ${name}</a>
          </p>
        </div>
      `,
    });

    // 3. Send confirmation email to the sender
    await transporter.sendMail({
      from: `"Francis Chinazor" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Got your message, ${name}! 👋`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#e94560">Hey ${name}, thanks for reaching out!</h2>
          <p>I received your message and I'll get back to you within <strong>24 hours</strong>.</p>
          <p style="background:#f9f9f9;padding:16px;border-radius:8px;border-left:4px solid #e94560">
            <em>"${message}"</em>
          </p>
          <p>While you wait, feel free to check out my work:<br>
            <a href="${process.env.CLIENT_URL}" style="color:#e94560">My Portfolio</a>
          </p>
          <p style="margin-top:24px;color:#666;font-size:13px">— Francis Chinazor · React Developer · Lagos, Nigeria</p>
        </div>
      `,
    });

    res.status(201).json({ success: true, id: saved._id });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// GET /api/contact  — admin only, returns all messages
router.get('/', authGuard, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/contact/:id/read  — admin only
router.patch('/:id/read', authGuard, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    res.json(msg);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/contact/:id  — admin only
router.delete('/:id', authGuard, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;