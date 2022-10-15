import { ImageSizeType } from "../models/ImageSizeType";
import { ThumbnailImg } from "../../../app/src/types/Images";

const fs = require("fs");
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
  width: Number = 300,
  height: Number = 300
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

export const getImageDiskPath = (slug: string, size?: ImageSizeType) => {
  if (!slug) {
    return UPLOADS_IMAGE_FOLDER;
  }
  switch (size) {
    case ImageSizeType.Thumbnail:
      return path.join(THUMBNAIL_IMAGE_FOLDER_PATH, slug);
    // same is size is original and default/ not specified
    case ImageSizeType.Original:
    default:
      return path.join(ORIGINAL_IMAGE_FOLDER_PATH, slug);
  }
};

/**
 * Removes all image sizes with the same slag name from disk
 */
export const removeImageFromDisk = (slug: string): void => {
  if (!slug) {
    throw new Error("Slug is not provided, image can not be removed");
  }

  let originalImgPath = path.join(ORIGINAL_IMAGE_FOLDER_PATH, slug);
  fs.unlink(originalImgPath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed ${slug}`);
    }
  });

  let thumbnailImgPath = path.join(THUMBNAIL_IMAGE_FOLDER_PATH, slug);
  fs.unlink(thumbnailImgPath, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed ${slug}`);
    }
  });
};
