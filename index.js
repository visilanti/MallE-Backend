require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ngrok = require('ngrok');
const rateLimit = require('express-rate-limit');

const admin = require('firebase-admin');
const credentials = require('./credential.json');

const productsRoute = require('./routes/productsRoute');
const transactionsRoute = require('./routes/transactionsRoute');
const userRoute = require('./routes/userRoute');


admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

// Initialize new express application instance
const app = express();
app.set('trust proxy', true);

// Middleware
app.use(express.json());
app.use(cors());
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 menit
  max: 100, // Maksimal 100 permintaan per IP
});
app.use(limiter);

// Route
app.use('/api/products/', productsRoute);
app.use('/api/transactions/', transactionsRoute);
app.use('/api/users/', userRoute);

// Connect to MongoDB
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined. Please check your .env file.');
} else {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 5,
    })
    .then(async () => {
      console.log('Connected to MongoDB');
      app.listen(PORT, async () => {
        console.log(`Server running locally on http://localhost:${PORT}`);
        try {
          await ngrok.authtoken(process.env.NGROK_AUTH_TOKEN);
          const ngrokUrl = await ngrok.connect(PORT);
          console.log(`Ngrok tunnel opened at: ${ngrokUrl}`);
        } catch (err) {
          console.error('Failed to start Ngrok:', err.message);
          console.log(`Server tetap berjalan tanpa Ngrok di http://localhost:${PORT}`);
        }
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error.message);
      process.exit(1);
    });
}

// Handle shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    await ngrok.disconnect();
    console.log('Ngrok tunnel closed.');
  } catch (err) {
    console.error('Error during shutdown:', err.message);
  }
  process.exit(0);
});
