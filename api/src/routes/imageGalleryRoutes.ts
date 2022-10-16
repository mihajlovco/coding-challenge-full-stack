import express from "express";
import { uploadImage, getImage } from "../controllers/imageGalleryController";
import multer from "multer";
import { fileFilter, uploadLimits } from "../utils/file.upload.helpers";

const router = express.Router();

// plugins
const upload = multer({ fileFilter, limits: uploadLimits });

router.post("/upload", upload.single("file"), uploadImage);
router.get("/image/:slug", getImage);

export default router;
