const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name : process.env.cloudname,
  api_key : process.env.key,
  api_secret : process.env.secret,
});

module.exports = { cloudinary };