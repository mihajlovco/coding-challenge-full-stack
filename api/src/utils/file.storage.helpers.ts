import fs from "express";
const path = require("path");
const sharp = require("sharp");

export const UPLOADS_IMAGE_FOLDER = path.join(__dirname, "..", "uploads");
export const ORIGINAL_IMAGE_FOLDER_PATH = path.join(UPLOADS_IMAGE_FOLDER, "original");
export const THUMBNAIL_IMAGE_FOLDER_PATH = path.join(UPLOADS_IMAGE_FOLDER, "thumbnail");

export const saveOriginalImage = async (imageBuffer: any, fileName: string): string => {
  const filepath = path.join(ORIGINAL_IMAGE_FOLDER_PATH, fileName);
  await sharp(imageBuffer).toFile(filepath);
  return fileName;
};

/**
 * @description Crop and save the image as thumbnail. Default size:
 */
export const saveThumbnailImage = async (
  imageBuffer: any,
  fileName: string,
  width: Number = 150,
  height: Number = 150
): string => {
  const filepath = path.join(THUMBNAIL_IMAGE_FOLDER_PATH, fileName);
  await sharp(imageBuffer)
    .resize(width, height, {
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFile(filepath);

  return fileName;
};

export const imageNameToLower = (name: string): string => {
  return name.toLowerCase().replace(/ /g, "-");
};
