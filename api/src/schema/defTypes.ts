import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql
  type Image {
    slug: String!
    name: String!
    originalUrl: String
    thumbnailUrl: String
  }

  input FilterImagesInput {
    name: String!
  }

  type Query {
    images: [Image],
    filterImages(input: FilterImagesInput!): [Image]
  }

  # Mutation inputs
  input DeleteImageInput {
    slug: String!
  }

  input UpdateImageInput {
    slug: String!
    name: String!
  }

  type Mutation {
    updateImage(input: UpdateImageInput!): Image!
    deleteImage(input: DeleteImageInput!): Image
  }
`;
