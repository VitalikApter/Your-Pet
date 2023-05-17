const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// const { API_KEY, CLOUD_NAME, API_SECRET } = process.env;

cloudinary.config({
    cloud_name: "dwptjohyl",
    api_key: "848645414645372",
    api_secret: "iKYfreljf7oHuGMgptKQ6eac_To",
  });

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "avatars",
    allowedFormats: ["jpg", "png"],
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
});
  
const uploadCloud = multer({ storage });
  
module.exports = uploadCloud;