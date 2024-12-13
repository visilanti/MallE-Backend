const express = require('express');
require('dotenv').config();
const { 
    getAllUsers,
    createNewUsers,
    updateUsers,
    getUsersByUId
} = require('../controllers/usersController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware'); 

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Menyiapkan penyimpanan Cloudinary untuk gambar produk
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users', 
        allowed_formats: ['jpeg', 'png', 'jpg'], 
    },
});

const upload = multer({ storage });

// Routes
router.get('/', getAllUsers);
router.post('/', authenticateToken, createNewUsers); 
router.put('/:id', authenticateToken,upload.single('image'), updateUsers); 
router.get('/:id', authenticateToken, getUsersByUId)

module.exports = router;
