import multer from "multer";
import CryptoJS from "crypto-js";
import path from "path";
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file::", file);
    if (file.fieldname === "idImage") {
      cb(null, "./data/images/userIDImages");
    } else if (file.fieldname === "profileImage") {
      cb(null, "./data/images/userProfileImages");
    }
  },
  filename: (req, file, callBack) => {
    var hash =
      CryptoJS.SHA256(
        file.fieldname + "-" + Date.now() + file.originalname
      ).toString() + path.extname(file.originalname);
    callBack(null, hash);
  },
});

const ImageUpload = multer({
  storage: Storage,
  limits: { files: 2 },
});
const multerMiddleware = ImageUpload.any();

export { multerMiddleware };
