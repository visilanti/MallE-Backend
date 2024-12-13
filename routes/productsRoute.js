const express = require('express');
require('dotenv').config();
const { 
    getAllProducts,
    getSingleProduct,
    getProductsByType,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductsByUId,
    updateRating,
} = require('../controllers/productsController');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const authenticateToken = require('../middleware/authMiddleware'); // Mengimpor middleware

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
        folder: 'products', // Folder di Cloudinary tempat gambar disimpan
        allowed_formats: ['jpeg', 'png', 'jpg'], // Format gambar yang diperbolehkan
    },
});

const upload = multer({ storage });

// Routes
router.get('/', getAllProducts);
router.get('/my-store', authenticateToken, getProductsByUId)
router.get('/:id', getSingleProduct);
router.get('/type', getProductsByType);
router.post('/', authenticateToken, upload.single('image'), createNewProduct); // Middleware upload dan authenticateToken
router.put('/:id', authenticateToken, updateProduct); // Menambahkan autentikasi untuk update produk
router.delete('/:id', authenticateToken, deleteProduct); // Menambahkan autentikasi untuk delete produk
router.put('/update-products-rating', authenticateToken, updateRating)

module.exports = router;
