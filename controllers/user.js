const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const getUsers = async (req = request, res = response) => {

  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };
  // const users = await User.find(query).skip(from).limit(limit);
  // const total = await User.find(query).countDocuments();

  const [total, users] = await Promise.all([
    User.find(query).countDocuments(),
    User.find(query).skip(from).limit(limit)
  ]);

  res.json({
    ok: true,
    total,
    users
  });

}

const postUser = async (req, res) => {

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  // Crypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  // Save in dB
  await user.save();
  res.status(201).json({
    ok: true,
    user
  });

}

const putUser = async (req, res) => {

  const { id } = req.params;
  const { _id, password, google, email, ...info } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    info.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, info, { new: true });
  res.json({
    ok: true,
    user
  });

}

const patchUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'PATCH'
  });
}

const deleteUser = async (req, res) => {

  const { id } = req.params;
  // const userDB = await User.findByIdAndDelete(id);
  const userDB = await User.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json({
    ok: true,
    userDB
  });

}


module.exports = { getUsers, postUser, putUser, patchUser, deleteUser };