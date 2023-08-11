const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = new Router();

router.post('/login', [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password is required').notEmpty(),
  fieldValidator
] ,login);

router.post('/google', [
  check('id_token', 'id_token is required').notEmpty(),
  fieldValidator
] ,googleSignIn);

module.exports = router;