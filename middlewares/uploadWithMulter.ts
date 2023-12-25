import multer from "multer";
import { uid } from "uid";

// Set the storage engine and file size limit
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const filename = `${uid()}-${file.originalname.split(" ").join("-")}`;
    const filelink = `${process.env.API}/${filename}`;
    // @ts-ignore
    req.filelink = filelink;
    cb(null, filename);
  },
});

const uploadWithMulter = multer({
  storage,
  limits: { fileSize: 5000000 }, // max file size allow 5MB
});

export default uploadWithMulter;
