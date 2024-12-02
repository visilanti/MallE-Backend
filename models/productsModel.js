const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const productSchema = new Schema({
    userId: {
        type: String, 
      },
    image: [String],
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    types: { 
        type: String, 
        enum: ['resume', 'book'], 
        required: true 
    },
    semester: String,
    courseName: {
        type: String,
        required: function() { return this.types === 'resume'; } // Hanya wajib untuk Resume
    },
    stars: {
        type: Number,
        default: 0
    },
    numberOfReview: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("productsmodel", productSchema)

/*
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
*/