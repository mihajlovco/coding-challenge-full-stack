import { ApolloServer } from "@apollo/server";
import { GalleryImages } from "../repository/db";

export const resolvers = {
  Query: {
    images: (parent, args) => {
      return GalleryImages;
    },
  },
};
