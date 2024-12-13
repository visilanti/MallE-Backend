const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  //get from collection products
  id_product: {  
    type: String,
    required: [true, "Description is required"]
  },
  //get from uid
  id_seller: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'User', required: true 
    type: String,
    required: [true, "Description is required"]
  },
  id_buyer: { 
    // type: mongoose.Schema.Types.ObjectId, 
    // ref: 'User', required: true 
    type: String,
    required: [true, "Description is required"]
  },
  total: { 
    type: Number, 
    required: true 
  },
  payment_method: { 
    type: String, 
    enum: ['gopay', 'COD'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['on_process', 'saled', 'cancel'], 
    // default: 'on_process' 
  },
}, {timestamps: true});

module.exports = mongoose.model("transactionsmodel", transactionSchema);