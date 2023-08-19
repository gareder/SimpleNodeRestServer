const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { jwtValidator, adminRole } = require('../middlewares');
const { productById, categoryById } = require('../helpers/db-validators');
const { postProduct, getProducts, getProduct, putProduct, deleteProduct } = require('../controllers/products');

const router = new Router();

router.get('/', getProducts);

router.get('/:id', [
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(productById),
  fieldValidator
], getProduct);

router.post('/', [
  jwtValidator,
  check('name', 'Name is required').notEmpty(),
  check('category', 'Category is invalid').isMongoId(),
  check('category').custom(categoryById),
  fieldValidator
], postProduct);

router.put('/:id', [
  jwtValidator,
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(productById),
  fieldValidator
], putProduct);


router.delete('/:id', [
  jwtValidator,
  adminRole,
  check('id', 'ID is invalid').isMongoId(),
  check('id').custom(productById),
  fieldValidator
], deleteProduct);


module.exports = router;