require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRoute = require('./routes/productsRoute');

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
    .then(() => app.listen(PORT, () => console.log(`Connected to DB and running on http://localhost:${PORT}`)))
    .catch((error) => console.log(`Error:`, error.message));
}


