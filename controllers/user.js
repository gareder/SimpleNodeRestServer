const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
  const { name, lastname = 'noLastName' } = req.query;
  res.json({
    ok: true,
    msg: 'GET Controller',
    name,
    lastname
  });
}

const postUser = (req, res) => {
  const body = req.body;
  res.status(201).json({
    ok: true,
    msg: 'POST',
    body
  });
}

const putUser = (req, res) => {
  const { id } = req.params;
  res.status(500).json({
    ok: true,
    msg: 'PUT',
    id
  });
}

const patchUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'PATCH'
  });
}

const deleteUser = (req, res) => {
  res.json({
    ok: true,
    msg: 'DELETE'
  });
}


module.exports = { getUsers, postUser, putUser, patchUser, deleteUser };