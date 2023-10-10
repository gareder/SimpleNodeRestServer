const { Router } = require('express');
const { check } = require('express-validator');
const { jwtValidator } = require('../middlewares/jwtValidator');
const { uploadFile, updateImage, getImage, updateCloudinaryImage } = require('../controllers/uploads');
const { fieldValidator, uploadFileValidator } = require('../middlewares');
const { allowedCollections } = require('../helpers');

const router = new Router();

router.post('/', [
  jwtValidator,
  uploadFileValidator
], uploadFile);

router.put('/:collection/:id', [
  uploadFileValidator,
  check('id', 'Invalid ID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  fieldValidator
], updateCloudinaryImage);
// ], updateImage);

router.get('/:collection/:id', [
  check('id', 'Invalid ID').isMongoId(),
  check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
  fieldValidator
], getImage);

module.exports = router;