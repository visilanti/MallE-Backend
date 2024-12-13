const express = require('express')

const {
    getAllTransactions,
    getSalesbyId,
    getPurchasesbyId,
    createNewTransactions, 
    getPurchaseByUId,
    updateOrderStatus,
    getSaleByUId
} = require('../controllers/transactionsController')
const authenticateToken = require('../middleware/authMiddleware'); // Mengimpor middleware
const router = express.Router()

router.get('/', getAllTransactions)
router.get('/sales/:id_seller', getSalesbyId);
router.get('/purchases/:id_buyer', getPurchasesbyId);
router.post('/', authenticateToken, createNewTransactions)
router.get('/my-purchases', authenticateToken, getPurchaseByUId)
router.get('/my-saled', authenticateToken, getSaleByUId)
router.put('/update-order-status', authenticateToken, updateOrderStatus)


module.exports = router;