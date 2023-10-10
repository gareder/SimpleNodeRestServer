const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require('express');
const { fileUploader } = require('../helpers');
const { User, Product } = require('../models');

const uploadFile = async (req, res = response) => {

  try {

    // Images
    // const fileName = await fileUploader(req.files, ['txt', 'pdf'], 'texts');
    const fileName = await fileUploader(req.files, undefined, 'imgs');

    res.json({ fileName });

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: error
    })
  }

}

const updateImage = async (req, res = response) => {

  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No user exists by id: ${id}`
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No product exists by id: ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        ok: false,
        msg: 'Server error to upload picture for users or products'
      });
  }

  // Delete previous img
  if (model.img) {
    // Delete img from the server
    const imgPath = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }

  const fileName = await fileUploader(req.files, undefined, collection);
  model.img = fileName;
  await model.save();
  res.json({ model });

}

const getImage = async (req, res = response) => {

  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No user exists by id: ${id}`
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No product exists by id: ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        ok: false,
        msg: 'Server error to upload picture for users or products'
      });
  }

  if (model.img) {
    const imgPath = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(imgPath)) {
      return res.sendFile(imgPath);
    }
  } else {
    const imgPath = path.join(__dirname, '../assets', 'no-image.jpg');
    return res.sendFile(imgPath);
  }

}

const updateCloudinaryImage = async (req, res = response) => {

  const { id, collection } = req.params;
  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No user exists by id: ${id}`
        });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.json({
          ok: true,
          msg: `No product exists by id: ${id}`
        });
      }
      break;
    default:
      return res.status(500).json({
        ok: false,
        msg: 'Server error to upload picture for users or products'
      });
  }

  // Delete previous img
  if (model.img) {
    const nameArr = model.img.split('/');
    const name = nameArr[nameArr.length - 1];
    const [ public_id ] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.myFile;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();
  res.json(model);

}

module.exports = {
  uploadFile,
  updateImage,
  getImage,
  updateCloudinaryImage
}