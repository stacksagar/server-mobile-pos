import express from "express";
import uploadWithMulter from "../middlewares/uploadWithMulter";
import error_res from "../utils/error_res";
const uploadRoutes = express.Router();

uploadRoutes.post("/single", uploadWithMulter.single("file"), (req, res) => {
  try {
    // @ts-ignore
    const filelink = req.filelink;
    res.status(200).json({ secure_url: filelink, url: filelink });
  } catch (error) {
    error_res(res, error);
  }
});

export default uploadRoutes;
