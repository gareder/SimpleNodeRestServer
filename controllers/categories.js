const { request, response } = require("express");
const { Category } = require('../models');


const postCategory = async (req = request, res = response) => {

  try {

    const name = req.body.name.toUpperCase();
    const dbCategory = await Category.findOne({ name });

    if (dbCategory) {
      return res.status(400).json({
        ok: false,
        msg: `Category ${dbCategory} already exists`
      });
    }

    const data = {
      name,
      user: req.loggedUser._id
    };

    const category = new Category(data);
    await category.save();

    res.status(201).json({
      ok: true,
      msg: 'Category created',
      category
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Sever error'
    });
  }

}

const getCategories = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, categories] = await Promise.all([
    Category.find(query).countDocuments(),
    Category.find(query).skip(from).limit(limit).populate('user', 'name')
  ]);

  res.json({
    ok: true,
    total,
    categories
  });

}

const getCategory = async (req, res) => {

  const { id } = req.params;

  const category = await Category.findById(id).populate('user', 'name');
  res.json({
    ok: true,
    category
  });

}

const putCategory = async (req, res) => {

  try {

    const { id } = req.params;
    const { status, loggedUser, ...info } = req.body;
    info.name = info.name.toUpperCase();
    info.user = req.loggedUser._id;

    if (!info.name || info.name.trim().length < 0) {
      return res.status(400).json({
        ok: true,
        msg: 'Name is required and cannot be empty'
      });
    }

    const category = await Category.findByIdAndUpdate(id, info, { new: true });
    res.json({
      ok: true,
      category
    });

  } catch (error) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Server error'
    });
  }

}

const deleteCategory = async (req, res) => {

  const { id } = req.params;
  // const userDB = await User.findByIdAndDelete(id);
  const categoryDB = await Category.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json({
    ok: true,
    categoryDB
  });

}

// get - paginate - total - populate
// get id - populate {}
// put id
// delete id - status: false

module.exports = {
  postCategory,
  getCategories,
  getCategory,
  putCategory,
  deleteCategory
}