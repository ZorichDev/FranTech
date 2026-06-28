const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  event:     { type: String, required: true }, // e.g. "page_view", "cv_download", "hire_me_click"
  page:      { type: String, default: 'home' },
  userAgent: { type: String, default: '' },
  ip:        { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('PageView', pageViewSchema);