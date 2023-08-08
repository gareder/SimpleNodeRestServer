const { response } = require("express")


const adminRole = (req, res = response, next) => {

  if (!req.loggedUser) {
    return res.status(500).json({
      ok: false,
      msg: 'Verify token before anything else'
    });
  }

  if (req.loggedUser.role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      ok: false,
      msg: 'Unauthorized for the action'
    });
  }

  next();

}

const roleValidator = (...roles) => {

  return (req, res = response, next) => {

    if (!req.loggedUser) {
      return res.status(500).json({
        ok: false,
        msg: 'Verify token before anything else'
      });
    }

    if (!roles.includes(req.loggedUser.role)) {
      return res.status(401).json({
        ok: false,
        msg: 'Unauthorized for the action'
      });
    }

    next();

  }

}

module.exports = {
  adminRole,
  roleValidator
}