const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  subject:   { type: String, default: 'Portfolio Inquiry', trim: true },
  message:   { type: String, required: true },
  read:      { type: Boolean, default: false },
  repliedAt: { type: Date, default: null },
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);