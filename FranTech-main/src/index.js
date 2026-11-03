
// Apply DNS workaround BEFORE other imports
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config({
  path: require('path').join(process.cwd(), '.env')
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

const app  = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'FranzorPortfolio API running ✅' });
});

// Seed admin account
const seedAdmin = async () => {
  try {
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.log('⚠️ Admin credentials not found in .env. Skipping admin seed.');
      return;
    }

    const Admin = require('./models/Admin');
    const exists = await Admin.findOne({
      email: process.env.ADMIN_EMAIL
    });

    if (!exists) {
      const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        passwordHash: hash
      });

      console.log(`👤 Admin account created: ${process.env.ADMIN_EMAIL}`);
    } else {
      console.log('👤 Admin account already exists.');
    }
  } catch (err) {
    console.error('Seed admin error:', err.message);
  }
};

// Start server after database connection
const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  }
};

startServer();
