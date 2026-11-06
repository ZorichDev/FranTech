const express = require('express');
const Project = require('../models/Project');
const PortfolioContent = require('../models/PortfolioContent');
const authGuard = require('../middleware/authGuard');
const validateId = require('../middleware/validateId');

const router = express.Router();
const projectFields = [
  'title', 'category', 'projectType', 'problem', 'desc', 'contribution', 'features',
  'tech', 'liveUrl', 'repoUrl', 'imageUrl', 'color', 'order', 'visible', 'featured', 'status',
];

const projectPayload = body => Object.fromEntries(
  projectFields.filter(field => body[field] !== undefined).map(field => [field, body[field]])
);

const recordActivity = (req, action, entity, entityId, title) => {
  const AdminActivity = require('../models/AdminActivity');
  return AdminActivity.create({ adminId: req.admin.id, action, entity, entityId: String(entityId || ''), title });
};

// GET /api/projects  — public, returns visible projects sorted by order
router.get('/', async (req, res) => {
  try {
    const [projects, projectsExist, contentExists] = await Promise.all([
      Project.find({
        visible: true,
        $or: [{ status: 'published' }, { status: { $exists: false } }],
      }).sort({ featured: -1, order: 1, createdAt: -1 }),
      Project.exists({}),
      PortfolioContent.exists({ key: 'portfolio' }),
    ]);
    res.set('X-Portfolio-Configured', String(Boolean(projectsExist || contentExists)));
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
    const project = await Project.create(projectPayload(req.body));
    await recordActivity(req, 'created', 'project', project._id, project.title);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/projects/:id  — admin only
router.put('/:id', authGuard, validateId, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, projectPayload(req.body), { new: true, runValidators: true });
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await recordActivity(req, 'updated', 'project', project._id, project.title);
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id  — admin only
router.delete('/:id', authGuard, validateId, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await recordActivity(req, 'deleted', 'project', project._id, project.title);
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;