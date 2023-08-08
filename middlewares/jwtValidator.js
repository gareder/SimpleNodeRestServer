const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtValidator = async (req = request, res = response, next) => {

  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Unauthorized. No token'
    });
  }

  try {

    const { uid } = jwt.verify(token, process.env.SECRETKEYFORFTWPAYLOAD);
    req.uid = uid;
    const loggedUser = await User.findById(uid);

    if (!loggedUser) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized'
      });
    }

    if (!loggedUser.status) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized!'
      });
    }

    req.loggedUser = loggedUser;
    next();

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Unauthorized. Bad token'
    });
  }

}

module.exports = {
  jwtValidator
}