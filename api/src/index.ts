import express from "express";
import { registerMiddlewares } from "./middlewares/registerMiddlewares";
import { fileStorageMiddleware } from "./middlewares/fileStorageMiddleware";
import multer from "multer";
import { fileStorage } from "./config/multer.config";
import cors from "cors";
import {
  saveImage,
  saveOriginalImage,
  imageNameToLower,
  saveThumbnailImage,
} from "./utils/file.storage.helpers";

const app = express();
const port = 3000;

app.use(cors());

// registerMiddlewares(app);
// const upload = fileStorageMiddleware();
const upload = multer();

app.post("/graphql", (req, res) => {
  res.send("Implement GraphQL endpoint!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    res.status(401).json({ error: "Please provide an image" });
  }
  const imageName = imageNameToLower(req.file.originalname);
  console.log("imageName", imageName);
  try {
    await saveOriginalImage(req.file.buffer, imageName);
    await saveThumbnailImage(req.file.buffer, imageName);
    res.status(200).json({ url: `/image/thumbnail/${imageName}`, name: imageName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`File Manager API is available at http://localhost:${port}`);
});
