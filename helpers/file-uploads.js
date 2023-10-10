const { v4: uuidv4 } = require('uuid');
const path = require('path');

const fileUploader = (files, allowedExtensions = ['jpg', 'png', 'jpeg', 'gif'], folder = '') => {

  return new Promise((resolve, reject) => {

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const { myFile } = files;
    const fileName = myFile.name.split('.');
    const extension = fileName[fileName.length - 1];
    if (!allowedExtensions.includes(extension)) {
      return reject('Invalid file extension');
    }

    const newFileName = uuidv4() + '.' + extension;
    // Joining paths
    const uploadPath = path.join(__dirname, '../uploads', folder, newFileName)

    // Use the mv() method to place the file somewhere on your server
    myFile.mv(uploadPath, function (err) {
      if (err)
        return reject(500);
      resolve(newFileName);
    });

  });

}

module.exports = {
  fileUploader
}