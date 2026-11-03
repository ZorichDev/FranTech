require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '.env'),
});
const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const bcrypt     = require('bcryptjs');

// Route imports
const authRoutes      = require('./routes/auth');
const contactRoutes   = require('./routes/contact');
const projectRoutes   = require('./routes/projects');
const analyticsRoutes = require('./routes/analytics');
const contentRoutes   = require('./routes/content');
const activityRoutes  = require('./routes/activity');

const app  = express();
const PORT = process.env.PORT || 5000;
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  exposedHeaders: ['X-Portfolio-Configured'],
}));
app.use(express.json({ limit: '3mb' }));

// Routes
app.use('/api/auth',      authRoutes);
app.use('/api/contact',   contactRoutes);
app.use('/api/projects',  projectRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/content',   contentRoutes);
app.use('/api/admin/activity', activityRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'FranzorPortfolio API running ✅' }));

// ─── Seed admin account on first run ───────────────────────────────────────
// Runs once: creates your admin account from .env credentials.
// Safe to leave in — it checks before creating.
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
      const passwordHash = await bcrypt.hash(password, 12);
      await Admin.create({ email, passwordHash });
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
  try {
    await connectDB();
    app.listen(PORT, async () => {
      await seedAdmin();
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  }
};

startServer();