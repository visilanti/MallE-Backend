// middleware/authMiddleware.js

const admin = require('firebase-admin');

// Middleware untuk memverifikasi token Firebase
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Token missing or incorrect' });
  }

  const token = authHeader.split(' ')[1]; // Ambil token setelah "Bearer"
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Tambahkan data user ke request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Forbidden: Token invalid or expired' });
  }
};

module.exports = authenticateToken;
