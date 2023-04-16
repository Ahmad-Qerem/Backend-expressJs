import multer from "multer";
import CryptoJS from "crypto-js";
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "data/userProfileImages");
  },
  filename: (req, file, callBack) => {
    var hash = CryptoJS.SHA256(file.fieldname + "-" + Date.now()+file.originalname).toString();
    callBack(null,hash);
  },
});

const upload = multer({ storage: storage });

const multerMiddleware = upload.single('profilePicture');
export {multerMiddleware};
