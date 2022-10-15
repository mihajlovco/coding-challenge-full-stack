const http = require("http");
import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./schema/defTypes";
import { resolvers } from "./schema/resolvers";

import imageGalleryRoutes from "./routes/imageGalleryRoutes";

const app = express();
const port = 3000;

// middleware
app.use(cors());

// Set Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// routes
app.use("/", imageGalleryRoutes);

async function startApolloServer() {
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  // Specify the path where we'd like to mount our server
  app.use("/graphql", cors<cors.CorsRequest>(), json(), expressMiddleware(server));
}

// Start server instances with API endpoints
app.listen(port, () => {
  console.log(`File Manager API is available at http://localhost:${port}`);
});
startApolloServer();
