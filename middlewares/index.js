const fieldValidator = require('../middlewares/fieldValidator');
const jwtValidator = require('../middlewares/jwtValidator');
const roleValidator = require('../middlewares/roleValidator');

module.exports = {
  ...fieldValidator,
  ...jwtValidator,
  ...roleValidator
}