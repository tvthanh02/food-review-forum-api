const multer = require('multer');
const cloudinary = require('./cloudinary.config');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (_, file) => {
    let folder = 'uploads';
    let resource_type = 'auto';

    return {
      folder,
      resource_type,
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
    };
  },
});

const fileValidation = (_, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    ['video/mp4', 'video/hevc', 'video/mov'].includes(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Only .jpg, .png for image and .mp4 for video format allowed!'),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileValidation,
});

module.exports = upload;
