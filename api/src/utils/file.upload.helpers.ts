import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
const sharp = require("sharp");

export const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
): void => {
  const whitelist = ["image/png", "image/jpeg", "image/jpg"];
  if (!whitelist.includes(file.mimetype)) {
    return callback(new Error("file is not allowed"));
  }
  callback(null, true);
};

export const uploadLimits = () => {
  return {
    limits: { fileSize: 5242880 }, // 5MB
  };
};

export const validateUploadImageSize = async (fileBuffer: Buffer): boolean => {
  const MIN_WIDTH = 300;
  const MIN_HEIGHT = 300;
  const image = await sharp(fileBuffer);
  const metadata = await image.metadata();
  console.log(metadata.width, metadata.height);
  return metadata.width >= MIN_WIDTH && metadata.height >= MIN_HEIGHT;
};
