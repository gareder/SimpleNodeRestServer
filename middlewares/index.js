const fieldValidator = require('../middlewares/fieldValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const roleValidator = require('../middlewares/roleValidator');
const uploadFileValidator = require('./uploadFileValidator');

module.exports = {
  ...fieldValidator,
  ...jwtValidator,
  ...roleValidator,
  ...uploadFileValidator
}