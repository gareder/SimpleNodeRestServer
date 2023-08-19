const { Role, User, Category, Product } = require('../models');

const validRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`Role: ${role} is not valid and doesn't exist in the DB`);
  }
}

const emailExists = async (email = '') => {
  const emailDB = await User.findOne({ email });
  if (emailDB) {
    throw new Error('The email already exists');
  }
}

const userById = async (id = '') => {
  const userDB = await User.findById(id);
  if (!userDB) {
    throw new Error('The ID does not exist');
  }
}

const categoryById = async (id = '') => {
  const categoryDB = await Category.findById(id);
  if (!categoryDB) {
    throw new Error('The ID does not exist');
  }
}


const productById = async (id = '') => {
  const productDB = await Product.findById(id);
  if (!productDB) {
    throw new Error('The ID does not exist');
  }
}

module.exports = {
  validRole,
  emailExists,
  userById,
  categoryById,
  productById
}