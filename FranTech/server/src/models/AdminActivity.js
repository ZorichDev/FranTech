const mongoose = require('mongoose');

const adminActivitySchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  action: { type: String, required: true, maxlength: 40 },
  entity: { type: String, required: true, maxlength: 40 },
  entityId: { type: String, default: '', maxlength: 64 },
  title: { type: String, default: '', maxlength: 160 },
}, { timestamps: true });

adminActivitySchema.index({ createdAt: -1 });

module.exports = mongoose.model('AdminActivity', adminActivitySchema);