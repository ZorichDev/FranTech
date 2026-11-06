const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema({
  event:      { type: String, required: true, enum: ['page_view', 'cv_download', 'hire_me_click'] },
  visitorId:  { type: String, required: true, maxlength: 64 },
  page:       { type: String, default: 'home', maxlength: 100 },
  referrer:   { type: String, default: '', maxlength: 500 },
  userAgent:  { type: String, default: '', maxlength: 500 },
}, { timestamps: true });

pageViewSchema.index({ event: 1, createdAt: -1 });
pageViewSchema.index({ visitorId: 1, event: 1 });

module.exports = mongoose.model('PageView', pageViewSchema);