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

const transporter = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })
  : null;

const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

const recordActivity = (req, action, message) => {
  const AdminActivity = require('../models/AdminActivity');
  return AdminActivity.create({ adminId: req.admin.id, action, entity: 'message', entityId: String(message._id), title: message.subject || message.name });
};

// POST /api/contact  — public, rate-limited
router.post('/', contactLimit, async (req, res) => {
  try {
    const body = req.body || {};
    const { companyWebsite } = body;
    if (typeof companyWebsite === 'string' && companyWebsite.trim()) {
      return res.status(201).json({ success: true });
    }

    const name = typeof body.name === 'string' ? body.name.trim().replace(/\s+/g, ' ') : '';
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim().replace(/[\r\n]+/g, ' ') : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';
    const projectType = typeof body.projectType === 'string' ? body.projectType.trim() : '';
    const budget = typeof body.budget === 'string' ? body.budget.trim() : '';

    if (!name || !email || message.length < 10)
      return res.status(400).json({ error: 'Name, valid email and a message of at least 10 characters are required.' });
    if (name.length > 100 || email.length > 254 || subject.length > 160 || message.length > 4000 || projectType.length > 100 || budget.length > 100)
      return res.status(400).json({ error: 'One or more fields exceed the allowed length.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return res.status(400).json({ error: 'Enter a valid email address.' });

    const saved = await Message.create({ name, email, subject, message, projectType, budget });

    let emailSent = false;
    if (transporter) {
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeSubject = escapeHtml(subject || 'Portfolio Inquiry');
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
      const safeType = escapeHtml(projectType || 'Not specified');
      const safeBudget = escapeHtml(budget || 'Not specified');
      try {
        await Promise.all([
          transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.GMAIL_USER,
            subject: `New message from ${name}: ${subject || 'Portfolio Inquiry'}`,
            html: `<h2>New portfolio message</h2><p><b>From:</b> ${safeName} (${safeEmail})</p><p><b>Subject:</b> ${safeSubject}</p><p><b>Project type:</b> ${safeType}</p><p><b>Budget:</b> ${safeBudget}</p><p>${safeMessage}</p>`,
          }),
          transporter.sendMail({
            from: `"Francis Chinazor" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: `Message received, ${name}`,
            html: `<p>Hello ${safeName},</p><p>Thanks for reaching out. Your message has been received.</p><blockquote>${safeMessage}</blockquote>`,
          }),
        ]);
        emailSent = true;
      } catch (mailError) {
        console.error('Contact email delivery failed:', mailError.message);
      }
    }

    res.status(201).json({ success: true, id: saved._id, emailSent });
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
      { read: typeof req.body?.read === 'boolean' ? req.body.read : true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    await recordActivity(req, msg.read ? 'marked read' : 'marked unread', msg);
    res.json(msg);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id/archive', authGuard, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { archived: true }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    await recordActivity(req, 'archived', msg);
    res.json(msg);
  } catch {
    res.status(400).json({ error: 'Message could not be archived.' });
  }
});

router.patch('/:id/unarchive', authGuard, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(req.params.id, { archived: false }, { new: true });
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    await recordActivity(req, 'restored', msg);
    res.json(msg);
  } catch {
    res.status(400).json({ error: 'Message could not be restored.' });
  }
});

// DELETE /api/contact/:id  — admin only
router.delete('/:id', authGuard, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ error: 'Message not found' });
    await recordActivity(req, 'deleted', msg);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;