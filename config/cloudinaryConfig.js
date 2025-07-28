const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { config } = require('dotenv');
config({ quiet: true }); 

// Cloudinary credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Multer config (in-memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to upload to Cloudinary from memory
const uploadToCloudinary = async (file) => {
  const fileBase64 = file.buffer.toString('base64');
  const dataURI = `data:${file.mimetype};base64,${fileBase64}`;
  return await cloudinary.uploader.upload(dataURI);
};

module.exports = {
  cloudinary,
  upload,
  uploadToCloudinary,
};