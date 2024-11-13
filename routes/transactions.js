router.post('/', auth, async (req, res) => {
  const { productId } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).send('Product not found.');

  // Simpan transaksi
  const transaction = new Transaction({
    buyer: req.user._id,
    seller: product.seller,
    product: product._id,
    price: product.price
  });

  await transaction.save();

  // Update data produk yang dibeli dan dijual
  const buyer = await User.findById(req.user._id);
  buyer.productsBought.push(product._id);
  await buyer.save();

  const seller = await User.findById(product.seller);
  seller.productsSold.push(product._id);
  await seller.save();

  res.send(transaction);
});
