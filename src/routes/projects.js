const express = require('express');
const Project = require('../models/Project');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

// GET /api/projects  — public, returns visible projects sorted by order
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/projects/all  — admin only (includes hidden projects)
router.get('/all', authGuard, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/projects  — admin only
router.post('/', authGuard, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/projects/:id  — admin only
router.put('/:id', authGuard, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id  — admin only
router.delete('/:id', authGuard, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;