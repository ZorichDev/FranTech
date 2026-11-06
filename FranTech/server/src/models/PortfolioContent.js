const mongoose = require('mongoose');

const portfolioContentSchema = new mongoose.Schema({
  key: { type: String, default: 'portfolio', unique: true },
  profile: { type: mongoose.Schema.Types.Mixed, default: {} },
  skills: { type: [mongoose.Schema.Types.Mixed], default: [] },
  experience: { type: [mongoose.Schema.Types.Mixed], default: [] },
  certifications: { type: [mongoose.Schema.Types.Mixed], default: [] },
  settings: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);