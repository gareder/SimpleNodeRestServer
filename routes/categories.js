const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { postCategory, getCategories, getCategory, putCategory, deleteCategory } = require('../controllers/categories');
const { jwtValidator, adminRole } = require('../middlewares');
const { categoryById } = require('../helpers/db-validators');

const router = new Router();

// Public
router.get('/', getCategories);

// Public
router.get('/:id', [
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(categoryById),
  fieldValidator
], getCategory);

// Private, token
router.post('/', [
  jwtValidator,
  check('name', 'Name is required').notEmpty(),
  fieldValidator
], postCategory);

// Private, token
router.put('/:id', [
  jwtValidator,
  check('name').notEmpty(),
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(categoryById),
  fieldValidator
], putCategory);


router.delete('/:id', [
  jwtValidator,
  adminRole,
  // roleValidator('ADMIN_ROLE', 'SALES_ROLE'),
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(categoryById),
  fieldValidator
], deleteCategory);


module.exports = router;