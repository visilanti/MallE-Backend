const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: [String],
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description:{
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "number is required"]
    },
    types: { 
        type: String, 
        enum: ['resume', 'book'], 
        required: true },
    courseName: {
        type: String,
        required: [true]
    },
    stars: {
        type: Number,
        default : 0
    },
    numberOfReview: {
        type: Number,
        default : 0
    },
}, {timestamps: true})

module.exports = mongoose.model("productsModel", productSchema)

/*
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
*/