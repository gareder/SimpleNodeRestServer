const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, putUser, postUser, patchUser, deleteUser } = require('../controllers/user');
const { validRole, emailExists, userById } = require('../helpers/db-validators');
// const { fieldValidator } = require('../middlewares/fieldValidator');
// const { jwtValidator } = require('../middlewares/jwtValidator');
// const { adminRole ,roleValidator } = require('../middlewares/roleValidator');
const { fieldValidator, jwtValidator, roleValidator } = require('../middlewares');

const router = new Router();

router.get('/', getUsers);

router.post('/', [
  check('name', 'Name is required').notEmpty(),
  check('password', 'Password is required and must have at least 6 characters').notEmpty().isLength({ min: 6 }),
  check('email', 'Email is not valid').isEmail(),
  check('email').custom(emailExists),
  // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom(validRole),
  fieldValidator
], postUser);

router.put('/:id', [
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(userById),
  check('role').custom(validRole),
  fieldValidator
], putUser);

router.patch('/', patchUser);

router.delete('/:id', [
  jwtValidator,
  // adminRole,
  roleValidator('ADMIN_ROLE', 'SUPER_ROLE'),
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(userById),
  fieldValidator
], deleteUser);

module.exports = router;