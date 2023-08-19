const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { Category, Product, Role, User } = require('../models')

const validCollections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async (query = '', res = response) => {

  const isMongoId = ObjectId.isValid(query);
  if (isMongoId) {
    const user = await User.findById(query);
    return res.json({
      results: user ? user : []
    });
  }

  const regex = new RegExp(query, 'i');
  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ status: true }]
  });

  res.json({
    ok: true,
    users
  });

}

const searchCaterogies = async (query = '', res = response) => {

  const isMongoId = ObjectId.isValid(query);
  if (isMongoId) {
    const category = await Category.findById(query);
    return res.json({
      results: category ? category : []
    });
  }

  const regex = new RegExp(query, 'i');
  const categories = await Category.find({
    $or: [{ name: regex }],
    $and: [{ status: true }]
  });

  res.json({
    ok: true,
    categories
  });

}

const searchProducts = async (query = '', res = response) => {

  const isMongoId = ObjectId.isValid(query);
  if (isMongoId) {
    const product = await Product.findById(query).populate('category', 'name').populate('user', 'name');
    return res.json({
      results: product ? product : []
    });
  }

  const regex = new RegExp(query, 'i');
  const products = await Product.find({
    $or: [{ name: regex }],
    $and: [{ status: true }]
  }).populate('category', 'name').populate('user', 'name');

  res.json({
    ok: true,
    products
  });

}


const searches = (req, res = response) => {

  const { collection, query } = req.params;

  if (!validCollections.includes(collection)) {
    return res.status(400).json({
      ok: false,
      msg: `${collection} is not a valid collection`
    });
  }

  switch (collection) {
    case 'users':
      searchUsers(query, res)
      break;
    case 'categories':
      searchCaterogies(query, res)
      break;
    case 'products':
      searchProducts(query, res)
      break;
    default:
      break;
  }

}

module.exports = {
  searches
}