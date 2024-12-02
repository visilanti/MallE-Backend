const mongoose = require('mongoose')
const TransactionModel = require('../models/transactionsModel');
const { v4: uuidv4 } = require('uuid'); // Untuk membuat ID transaksi unik

// Mendapatkan semua transaksi
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving transactions', details: error.message });
  }
};

// Mendapatkan semua penjualan berdasarkan id_active
const getSalesbyId = async (req, res) => {
  try {
    const { id_seller } = req.params;

    const sales = await TransactionModel.find({ 
      id_seller: id_seller, 
      status: 'saled' 
    });

    // Periksa jika tidak ada data
    if (sales.length === 0) {
      return res.status(404).json({ error: "No sales found for the given seller" });
    }

    //if its ok return it
    return res.status(200).json(sales)

  } catch (error) {
    res.status(500).json({ error: 'Error retrieving sales transactions', details: error.message });
  }
};

// Mendapatkan semua pembelian berdasarkan id_active
const getPurchasesbyId = async (req, res) => {
  try {
    const { id_buyer } = req.params;

    const purchases = await TransactionModel.find({ 
      id_buyer: id_buyer, 
      status: 'saled' 
    });

    // Periksa jika tidak ada data
    if (purchases.length === 0) {
      return res.status(404).json({ error: "No purchases found" });
    }

    //if its ok return it
    return res.status(200).json(purchases)

  } catch (error) {
    res.status(500).json({ error: 'Error retrieving purchases transactions', details: error.message });
  }
};

// Membuat transaksi baru
const createNewTransactions = async (req, res) => {
  // const id_buyer = req.user.id_active; // Mengambil id_buyer dari user aktif (autentikasi)
  try {
    const { 
      id_product, 
      id_seller,
      id_buyer, 
      total, 
      payment_method,
      status 
    } = req.body;

    const newTransaction = await TransactionModel.create({
      id_product,
      id_seller,
      id_buyer,
      total,
      payment_method,
      status,
    });

    return res.status(200).json(newTransaction);  
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Error creating transaction', details: error.message });
  }
};

// Export semua fungsi sebagai modul
module.exports = {
  getAllTransactions,
  getSalesbyId,
  getPurchasesbyId,
  createNewTransactions
};
