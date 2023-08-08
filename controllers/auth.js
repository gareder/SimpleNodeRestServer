const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async (req = request, res = response) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or password is not correct'
      });
    }

    // Check if user is active
    if (user.status === false) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized, user is not active'
      });
    }

    // Check if valid is valid
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Email or password is not correct'
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: 'Server error'
    });
  }

  res.json({
    ok: true,
    msg: 'Login'
  });

}


module.exports = {
  login
};