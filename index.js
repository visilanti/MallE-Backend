require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoute = require('./routes/productsRoute');
const os = require('os');
const interfaces = os.networkInterfaces();

// Fungsi untuk mendapatkan IP lokal
function getLocalIPAddress() {
  for (const name of Object.keys(interfaces)) {
    for (const net of interfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

// Initialize new express application instance
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api/products/", productsRoute); // Added leading slash

// Connect to MongoDB
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined. Please check your .env file.");
} else {
  mongoose.connect(MONGODB_URI)
  .then(() => {
    const localIP = getLocalIPAddress();
    app.listen(PORT, () => {
      console.log(`Connected to DB and running on http://${localIP}:${PORT}`);
    });
  })
  .catch((error) => console.log(`Error:`, error.message));
}


