const { request, response } = require("express");
const { Product, Category } = require('../models');


const postProduct = async (req = request, res = response) => {

  try {

    const { status, loggedUser, ...body } = req.body;
    const dbProduct = await Product.findOne({ name: req.body.name });

    if (dbProduct) {
      return res.status(400).json({
        ok: false,
        msg: `Product ${dbProduct} already exists`
      });
    }

    const data = {
      ...body,
      name: body.name.toUpperCase(),
      user: req.loggedUser._id,
    };

    const product = new Product(data);
    await product.save();

    res.status(201).json({
      ok: true,
      msg: 'Product created',
      product
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Sever error'
    });

  }

}

const getProducts = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, products] = await Promise.all([
    Product.find(query).countDocuments(),
    Product.find(query).skip(from).limit(limit).populate('user', 'name').populate('category', 'name')
  ]);

  res.json({
    ok: true,
    total,
    products
  });

}

const getProduct = async (req, res) => {

  const { id } = req.params;

  const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');
  res.json({
    ok: true,
    product
  });

}

const putProduct = async (req, res) => {

  try {

    const { id } = req.params;
    const { status, loggedUser, ...body } = req.body;

    if (body.name) {
      body.name = body.name.toUpperCase();
    }

    body.user = req.loggedUser._id;

    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    res.json({
      ok: true,
      product
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Server error'
    });
  }

}

const deleteProduct = async (req, res) => {

  const { id } = req.params;
  // const userDB = await User.findByIdAndDelete(id);
  const productDB = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json({
    ok: true,
    productDB
  });

}

module.exports = {
  postProduct,
  getProducts,
  getProduct,
  putProduct,
  deleteProduct
}