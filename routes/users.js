const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Cek apakah email sudah terdaftar
  let user = await User.findOne({ email });
  if (user) return res.status(400).send('User already registered.');

  // Enkripsi password
  const hashedPassword = await bcrypt.hash(password, 10);

  user = new User({ name, email, password: hashedPassword });
  await user.save();

  // Generate JWT token
  const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
  res.header('x-auth-token', token).send({ _id: user._id, name, email });
});

//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Cek pengguna
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password.');
  
    // Verifikasi password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');
  
    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    res.send({ token });
  });

  router.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
      .populate('productsSold')
      .populate('productsBought');
    res.send(user);
  });  
  
  module.exports = router;
  