const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true, maxlength: 100 },
  email:     { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  subject:   { type: String, default: 'Portfolio Inquiry', trim: true, maxlength: 160 },
  message:   { type: String, required: true, trim: true, maxlength: 4000 },
  projectType: { type: String, default: '', trim: true, maxlength: 100 },
  budget:    { type: String, default: '', trim: true, maxlength: 100 },
  read:      { type: Boolean, default: false },
  archived:  { type: Boolean, default: false },
  repliedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);