const dbValidators = require('./db-validators');
const fileUpload = require('./file-uploads');
const generateJWT = require('./generate-jwt');
const googleVerify = require('./google-verify');

module.exports = {
  ...dbValidators,
  ...fileUpload,
  ...generateJWT,
  ...googleVerify
}