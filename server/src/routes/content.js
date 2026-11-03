const express = require('express');
const PortfolioContent = require('../models/PortfolioContent');
const authGuard = require('../middleware/authGuard');
const AdminActivity = require('../models/AdminActivity');

const router = express.Router();
const collections = ['skills', 'experience', 'certifications'];
const text = value => typeof value === 'string' ? value.trim() : '';
const validImageData = value => typeof value === 'string'
  && value.length <= 750000
  && /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value);

const emptyContent = () => ({
  profile: {},
  skills: [],
  experience: [],
  certifications: [],
  settings: {},
});

const normalizeContent = body => {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('Content must be an object.');
  }

  const content = emptyContent();
  const profileFields = [
    'name', 'brand', 'title', 'tagline', 'heroHeadline', 'heroDescription', 'heroSupporting',
    'contactHeading', 'contactDescription', 'location', 'availability', 'email', 'biography',
    'photoUrl', 'cvUrl', 'githubUrl', 'linkedinUrl', 'whatsappUrl',
  ];
  const settingFields = ['siteTitle', 'metaDescription', 'ogImageUrl', 'accentColor'];

  for (const field of profileFields) {
    if (body.profile?.[field] !== undefined) {
      const value = text(body.profile[field]);
      if (field === 'photoUrl' && value.startsWith('data:') && !validImageData(value)) {
        throw new Error('Profile photo must be a JPG, PNG or WebP image smaller than 512 KB.');
      }
      if (field !== 'photoUrl' && value.length > 5000) throw new Error(`${field} is too long.`);
      if (field === 'photoUrl' && !value.startsWith('data:') && value.length > 2000) throw new Error('photoUrl is too long.');
      content.profile[field] = value;
    }
  }

  for (const field of settingFields) {
    if (body.settings?.[field] !== undefined) {
      const value = text(body.settings[field]);
      if (value.length > 5000) throw new Error(`${field} is too long.`);
      if (field === 'accentColor' && !/^#[0-9a-f]{6}$/i.test(value)) throw new Error('Theme accent must be a six-digit hex color.');
      content.settings[field] = value;
    }
  }

  for (const collection of collections) {
    const records = body[collection] ?? [];
    if (!Array.isArray(records) || records.length > 100) {
      throw new Error(`${collection} must be an array with no more than 100 entries.`);
    }
    if (records.some(record => !record || typeof record !== 'object' || Array.isArray(record))) {
      throw new Error(`${collection} contains an invalid entry.`);
    }
    for (const record of records) {
      if (record.imageUrl?.startsWith('data:') && !validImageData(record.imageUrl)) {
        throw new Error(`${collection} images must be JPG, PNG or WebP files smaller than 512 KB.`);
      }
    }
    content[collection] = records;
  }

  if (JSON.stringify(content).length > 2800000) throw new Error('Portfolio content is too large to save.');

  return content;
};

router.get('/', async (req, res) => {
  try {
    const content = await PortfolioContent.findOne({ key: 'portfolio' }).lean();
    res.json(content ? {
      configured: true,
      profile: content.profile || {},
      skills: content.skills || [],
      experience: content.experience || [],
      certifications: content.certifications || [],
      settings: content.settings || {},
    } : { ...emptyContent(), configured: false });
  } catch {
    res.status(500).json({ error: 'Portfolio content could not be loaded.' });
  }
});

router.get('/admin', authGuard, async (req, res) => {
  try {
    const content = await PortfolioContent.findOne({ key: 'portfolio' }).lean();
    res.json(content ? {
      configured: true,
      profile: content.profile || {},
      skills: content.skills || [],
      experience: content.experience || [],
      certifications: content.certifications || [],
      settings: content.settings || {},
      updatedAt: content.updatedAt,
    } : { ...emptyContent(), configured: false });
  } catch {
    res.status(500).json({ error: 'Portfolio content could not be loaded.' });
  }
});

router.put('/', authGuard, async (req, res) => {
  try {
    const content = normalizeContent(req.body);
    const saved = await PortfolioContent.findOneAndUpdate(
      { key: 'portfolio' },
      { $set: content, $setOnInsert: { key: 'portfolio' } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    await AdminActivity.create({ adminId: req.admin.id, action: 'updated', entity: 'portfolio content', title: 'Profile, skills, experience, certifications and settings' });
    res.json({
      configured: true,
      profile: saved.profile,
      skills: saved.skills,
      experience: saved.experience,
      certifications: saved.certifications,
      settings: saved.settings,
      updatedAt: saved.updatedAt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message || 'Portfolio content could not be saved.' });
  }
});

module.exports = router;