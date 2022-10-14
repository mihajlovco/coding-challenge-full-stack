const http = require("http");
import express from "express";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import { typeDefs } from "./schema/defTypes";
import { resolvers } from "./schema/resolvers";
import { registerMiddlewares } from "./middlewares/registerMiddlewares";
import { fileStorageMiddleware } from "./middlewares/fileStorageMiddleware";
import multer from "multer";
import { fileStorage } from "./config/multer.config";
import cors from "cors";

import { saveImage, saveOriginalImage, saveThumbnailImage } from "./utils/file.storage.helpers";

const app = express();
const port = 3000;

// plugins
const upload = multer();

// middleware
app.use(cors());

// Set Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  // Specify the path where we'd like to mount our server
  app.use("/graphql", cors<cors.CorsRequest>(), json(), expressMiddleware(server));
}

// API endpoints
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

// Start server instances with API endpoints
app.listen(port, () => {
  console.log(`File Manager API is available at http://localhost:${port}`);
});
startApolloServer();
