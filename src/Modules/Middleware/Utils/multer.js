import multer from "multer";
import CryptoJS from "crypto-js";
import path from "path"
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "data/images/userProfileImages");
  },
  filename: (req, file, callBack) => {
    var hash = CryptoJS.SHA256(file.fieldname + "-" + Date.now()+file.originalname).toString()+path.extname(file.originalname);
    callBack(null,hash);
  },
});

const upload = multer({ storage: storage });

const multerMiddleware = upload.single('profilePicture');
export {multerMiddleware};
