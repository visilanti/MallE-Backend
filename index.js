require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ngrok = require('ngrok'); // Tambahkan ini

const admin = require('firebase-admin');
const credentials = require('./credential.json');

const productsRoute = require('./routes/productsRoute');
const transactionsRoute = require('./routes/transactionsRoute');

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Initialize new express application instance
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api/products/", productsRoute); 
app.use("/api/transactions/", transactionsRoute); 

// Connect to MongoDB
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined. Please check your .env file.");
} else {
  mongoose.connect(MONGODB_URI)
  .then(async () => {
    app.listen(PORT, async () => {
      console.log(`Server running locally on http://localhost:${PORT}`);

      // Tambahkan token autentikasi Ngrok
      try {
        await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
        const ngrokUrl = await ngrok.connect(PORT); // Hubungkan ke port server
        console.log(`Ngrok tunnel opened at: ${ngrokUrl}`);
      } catch (err) {
        console.error("Failed to start Ngrok:", err);
      }
    });
  })
  .catch((error) => console.log(`Error:`, error.message));
}
