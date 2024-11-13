const express = require('express')

const {
    getAllProducts,
    getProductsByType,
    getSingleProduct,
    createNewProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productsController')

const router = express.Router()


//get all products
router.get('/', getAllProducts)

// Route untuk mendapatkan semua produk berdasarkan tipe
router.get('/types', getProductsByType);

//get a single products
router.get('/:id', getSingleProduct)

//create new product
router.post('/', createNewProduct)

//update a product
router.put('/:id', updateProduct)

//delete product
router.delete('/:id', deleteProduct)

module.exports = router;