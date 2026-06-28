const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  category: { type: String, required: true },
  problem:  { type: String, required: true },
  desc:     { type: String, required: true },
  features: [String],
  tech:     [String],
  liveUrl:  { type: String, default: '' },
  repoUrl:  { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  color:    { type: String, default: '#e94560' },
  order:    { type: Number, default: 0 },
  visible:  { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);