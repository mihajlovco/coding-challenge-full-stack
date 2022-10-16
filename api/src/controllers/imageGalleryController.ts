const fs = require("fs");
const path = require("path");
import { ImageGalleryRepository } from "../repository/Context/ImageGalleryRepository";
import { getImageDiskPath } from "../utils/file.storage.helpers";
import { validateUploadImageSize } from "../utils/file.upload.helpers";

const galleryRepo = new ImageGalleryRepository();

export const getImage = async (req, res) => {
  const { params, query } = req;
  try {
    const { slug } = params;
    const { size } = query;
    const imagePath = getImageDiskPath(slug, size);
    if (fs.existsSync(imagePath)) {
      return res.sendFile(imagePath);
    }
    res.status(500).json({ message: "No such image found" });
  } catch (error) {
    res.status(500).json({ message: "No such image found" });
  }
};

export const uploadImage = async (req, res) => {
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }

  try {
    const { buffer, originalname, mimetype } = req.file;
    const isValid = await validateUploadImageSize(buffer);
    if (!isValid) {
      res.status(500).json({ error: "Image size is not valid" });
    }
    const imageModel = await galleryRepo.create(buffer, originalname, mimetype);
    res.status(200).json(imageModel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
