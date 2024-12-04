const mongoose = require('mongoose')
const productsModel = require('../models/productsModel')

const getAllProducts = async (req, res) => {
    try{
        const products = await productsModel.find({}).sort({ createAt: -1}) //sort by newest

        //check if there no products
        if(products.length === 0 ){
            return res.status(404).json({message: "no products found"})
        }
        //if there is return it
        return res.status(200).json(products)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const getProductsByUId = async (req, res) => {
    try {
      console.log("Fetching products for user UID:", req.user.uid); // Verifikasi uid dari token
      
      // Pastikan Anda menggunakan `productsModel` untuk mencari produk
      const products = await productsModel.find({ userToken: req.user.uid }); 
  
      if (!products.length) {
        return res.status(404).json({ message: "No products found for this user" });
      }
  
      res.json({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

const getProductsByType = async (req, res) => {
    try {
      // Ambil query parameter "type" dari URL
      const { type } = req.query;
  
      // Validasi nilai `type`
      if (!type || (type !== 'resume' && type !== 'book')) {
        return res.status(400).json({ error: 'Invalid type value. Accepted values are "resume" or "book".' });
      }
  
      // Cari produk berdasarkan `types` dengan nilai enum `resume` atau `book`
      const productsModel = await productsModel.find({ types: type });
  
      // Kembalikan hasil ke client
      return res.status(200).json(products);
    } catch (error) {
      // Tangani error jika ada masalah
      return res.status(500).json({ error: error.message });
    }
  };

const getSingleProduct = async (req, res) => {
    try{
        //get its id
        const {id} = req.params;

        //validate the id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "no such id"})
        }
        //get the post by id
        const Product = await productsModel.findById(id)
        //check if valid product
        if(!Product){
           return res.status(400).json({error: "not valid product"})
        }
        //if its ok return it
        return res.status(200).json(Product)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const createNewProduct = async (req, res) => {
    try {
        const userId = req.user.uid; 
        
        const {
            title,
            description,
            price,
            types,
            semester,
            courseName,
        } = req.body;

        // Validasi dinamis
        if (!title || !description || !price || !types) {
            return res.status(400).json({ error: "Missing required fields." });
        }

        if (types === 'resume' && !courseName) {
            return res.status(400).json({ error: "Course name is required for Resume." });
        }

        // Validasi gambar
        if (!req.file || !req.file.path) {
            return res.status(400).json({ error: "Image is required." });
        }

        const imageUrl = req.file.path;

        const newProduct = await productsModel.create({
            image: [imageUrl],
            title,
            description,
            price,
            types,
            semester,
            courseName: courseName || null, // Tambahkan null jika tidak diperlukan
            userToken: userId,
        });

        return res.status(200).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try { 
        
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "No such ID"})
        }
        const updateProduct = await productsModel.findByIdAndUpdate(id, {...req.body}, {new: true})

        if(!updateProduct){
            return res.status(400).json({error: "couldnt update the product"})
        }

        return res.status(200).json(updateProduct)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: "No such ID"})
        }
        const deleteProductByItsID = await productsModel.findByIdAndDelete(id)

        return res.status(200).json(deleteProductByItsID)

    }catch(error){
        return res.status(500).json({error: error.message})

    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    getProductsByType,
    createNewProduct,
    updateProduct,
    deleteProduct,
    getProductsByUId
}