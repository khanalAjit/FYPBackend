const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  }
  cb(null, false);
};

const profileImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./Profiles");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadProfile = multer(
  { storage: profileImage },
  { fileFilter: fileFilter }
);

module.exports = uploadProfile;
