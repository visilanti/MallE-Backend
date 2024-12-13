const UserModel = require('../models/userModel');

const getAllUsers = async (req, res) => {
    try {
      const users = await UserModel.find(); // Mendapatkan semua data
      if (!users || users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
      res.status(200).json(users); // Kirim data pengguna
    } catch (error) {
      res.status(500).json({
        error: 'Error retrieving users',
        details: error.message,
      });
    }
  };  

// Membuat pengguna baru
const createNewUsers = async (req, res) => {
    const userId = req.user?.uid;
    const { email } = req.body;

    console.log('User ID:', userId);
    console.log('Email:', email);

    if (!userId || !email) {
        return res.status(400).json({ message: 'User ID or Email missing' });
    }

    try {
        const newUser = new UserModel({ 
            uid: userId, 
            email 
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};


// Mengupdate data pengguna
const updateUsers = async (req, res) => {
    try {
        const { id } = req.params; 
        const { name, telp } = req.body; 
        const imageFile = req.file; // Ambil file gambar dari req.file

        // Pastikan ID ada
        if (!id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Cari user berdasarkan UID
        const user = await UserModel.findOne({ uid: id }); // Gunakan model User yang sesuai
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update data user hanya jika data baru dikirimkan
        if (name) user.name = name;
        if (telp) user.telp = telp;

        // Cek apakah ada file gambar yang diupload
        if (imageFile) {
            // Simpan URL gambar dari Cloudinary
            user.image = imageFile.path; // Cloudinary URL sudah ada di imageFile.path
        }

        // Simpan perubahan ke database
        const updatedUser = await user.save();

        // Respon sukses
        res.status(200).json({ 
            message: 'User updated successfully', 
            user: updatedUser 
        });
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Mendapatkan data pengguna berdasarkan UID
const getUsersByUId = async (req, res) => {
    const uid = req.user.uid; // UID berasal dari token autentikasi Firebase

    try {
        const user = await UserModel.findOne({ uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user by UID', error });
    }
};

module.exports = {
    getAllUsers,
    createNewUsers,
    updateUsers,
    getUsersByUId,
};
