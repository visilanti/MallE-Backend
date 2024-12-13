const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    //ini dari uid akun 
    uid: {
        type: String,
        required: true, 
      },
    image: [String],
    //ini get dari email firebase yg didaftarkan
    email: {
        type: String,
        required: true, 
    },
    name: {
        type: String,
    },
    telp: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("usermodels", userSchema)