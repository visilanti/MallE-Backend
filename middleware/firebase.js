// Import Firebase Admin SDK
const admin = require('firebase-admin');

// Inisialisasi Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(require('./config/serviceAccountKey.json')), // Path ke file JSON
  databaseURL: 'https://<YOUR_PROJECT_ID>.firebaseio.com' // Ganti dengan URL database Anda (opsional, jika menggunakan database real-time Firebase)
});

module.exports = admin;
