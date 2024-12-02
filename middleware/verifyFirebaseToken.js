
const admin = require('../firebase'); // Import Firebase Admin

const verifyFirebaseToken = async (req, res, next) => {
  // Ambil token dari header Authorization
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    // Verifikasi token menggunakan Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Tambahkan data pengguna ke request
    next();
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyFirebaseToken;
