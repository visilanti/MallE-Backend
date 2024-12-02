const express = require('express')

const {
    getAllTransactions,
    getSalesbyId,
    getPurchasesbyId,
    createNewTransactions, 
} = require('../controllers/transactionsController')

const router = express.Router()

//get all transaction
router.get('/', getAllTransactions)

// Route untuk mendapatkan semua penjualan berdasarkan id_Active
router.get('/sales/:id_seller', getSalesbyId);

// Route untuk mendapatkan semua pembelian berdasarkan id_Active
router.get('/purchases/:id_buyer', getPurchasesbyId);

//menambah transaksi baru
router.post('/', createNewTransactions)

module.exports = router;