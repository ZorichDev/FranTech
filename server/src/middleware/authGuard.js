const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const authGuard = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token — access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('_id role email');
    if (!admin) return res.status(401).json({ error: 'Admin account no longer exists.' });
    if (admin.role !== 'admin') return res.status(403).json({ error: 'Administrator access required.' });
    req.admin = { id: admin._id.toString(), email: admin.email, role: admin.role };
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = authGuard;