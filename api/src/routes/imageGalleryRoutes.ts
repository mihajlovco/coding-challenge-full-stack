import express from "express";
import { uploadImage, getImage } from "../controllers/imageGalleryController";
import multer from "multer";

const router = express.Router();

// plugins
const upload = multer();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/image/:slug", getImage);

export default router;
