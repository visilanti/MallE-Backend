const express = require('express');
require('dotenv').config();
const { 
    getAllProducts,
    getSingleProduct,
    getProductsByType,
    createNewProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productsController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder di Cloudinary tempat gambar disimpan
        allowed_formats: ['jpeg', 'png', 'jpg'], // Format gambar yang diperbolehkan
    },
});

const upload = multer({ storage });

// Routes
router.get('/', getAllProducts);
router.get('/:id', getSingleProduct);
router.get('/type', getProductsByType);
router.post('/', upload.single('image'), createNewProduct); // Middleware upload
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
