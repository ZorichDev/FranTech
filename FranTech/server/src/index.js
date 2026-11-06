const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

// Optional: some local networks (common in Nigeria) fail to resolve MongoDB Atlas
// "mongodb+srv://" addresses. Set DNS_SERVERS=8.8.8.8,8.8.4.4 in .env to work around it.
if (process.env.DNS_SERVERS) {
  require('node:dns').setServers(process.env.DNS_SERVERS.split(',').map(s => s.trim()).filter(Boolean));
}

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');
const projectRoutes = require('./routes/projects');
const analyticsRoutes = require('./routes/analytics');
const contentRoutes = require('./routes/content');
const activityRoutes = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);

// CLIENT_URL can hold several origins, comma separated:
// CLIENT_URL=https://fran-tech-nine.vercel.app,http://localhost:5173
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',').map(o => o.trim().replace(/\/+$/, '')).filter(Boolean);
if (process.env.NODE_ENV !== 'production') allowedOrigins.push('http://localhost:5173', 'http://127.0.0.1:5173');

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin(origin, callback) {
    // No Origin header = same-origin, curl, health checks.
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  credentials: true,
  exposedHeaders: ['X-Portfolio-Configured'],
}));
app.use(express.json({ limit: '3mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin/activity', activityRoutes);

const health = (req, res) => res.json({ status: 'FranzorPortfolio API running ✅', uptime: Math.round(process.uptime()) });
app.get('/', health);
app.get('/api/health', health);

app.use('/api', (req, res) => res.status(404).json({ error: 'Route not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.message?.includes('not allowed by CORS')) return res.status(403).json({ error: err.message });
  if (err.type === 'entity.too.large') return res.status(413).json({ error: 'Request is too large.' });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON body.' });
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Server error' });
});

// Creates the admin from .env on first run, and re-syncs the password if you change it there.
const seedAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      console.error('Admin seed skipped: ADMIN_EMAIL and ADMIN_PASSWORD must be configured.');
      return;
    }
    const Admin = require('./models/Admin');
    const admin = await Admin.findOne({ email });
    if (!admin) {
      await Admin.create({ email, passwordHash: await bcrypt.hash(password, 12) });
      console.log('Admin account created from server configuration.');
    } else if (!(await bcrypt.compare(password, admin.passwordHash))) {
      admin.passwordHash = await bcrypt.hash(password, 12);
      await admin.save();
      console.log('Admin password synchronized from server configuration.');
    }
  } catch (err) {
    console.error('Seed admin error:', err.message);
  }
};

const startServer = async () => {
  for (const key of ['MONGODB_URI', 'JWT_SECRET']) {
    if (!process.env[key]) {
      console.error(`Missing ${key} in server/.env`);
      process.exit(1);
    }
  }
  try {
    await connectDB();
    const server = app.listen(PORT, async () => {
      await seedAdmin();
      console.log(`🚀 Server running on port ${PORT}`);
    });
    const shutdown = () => server.close(() => require('mongoose').connection.close(false).then(() => process.exit(0)));
    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  }
};

startServer();
