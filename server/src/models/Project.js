const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:    { type: String, required: true, trim: true, maxlength: 120 },
  category: { type: String, required: true, trim: true, maxlength: 80 },
  projectType: { type: String, default: 'frontend', enum: ['fullstack', 'frontend', 'backend', 'ecommerce', 'business'] },
  problem:  { type: String, required: true, trim: true, maxlength: 1500 },
  desc:     { type: String, required: true, trim: true, maxlength: 2500 },
  contribution: { type: String, default: '', trim: true, maxlength: 1500 },
  features: [String],
  tech:     [String],
  liveUrl:  { type: String, default: '' },
  repoUrl:  { type: String, default: '' },
  imageUrl: { type: String, default: '', maxlength: 750000 },
  color:    { type: String, default: '#3b82f6' },
  order:    { type: Number, default: 0 },
  visible:  { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  status:   { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);