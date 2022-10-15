import { ApolloServer } from "@apollo/server";
import { GalleryImages } from "../repository/db";
import { ImageGalleryRepository } from "../repository/Context/ImageGalleryRepository";

const imageRepo = new ImageGalleryRepository();

export const resolvers = {
  Query: {
    images: (parent, args) => {
      return imageRepo.getAll();
    },
    filterImages: (parent, args) => {
      const name = args.name;
      return imageRepo.filter(name);
    },
  },

  Mutation: {
    updateImage: (parent, args) => {
      return imageRepo.update(args.input as Image);
    },
    deleteImage: (parent, args) => {
      const { slug } = args.input;
      return imageRepo.delete(slug);
    },
  },
};
