const express = require('express')

const {
    getAllTransactions,
    getSalesbyId,
    getPurchasesbyId,
    createNewTransactions, 
} = require('../controllers/transactionsController')
const authenticateToken = require('../middleware/authMiddleware'); // Mengimpor middleware
const router = express.Router()

router.get('/', getAllTransactions)

router.get('/sales/:id_seller', getSalesbyId);

router.get('/purchases/:id_buyer', getPurchasesbyId);

router.post('/', authenticateToken, createNewTransactions)

module.exports = router;