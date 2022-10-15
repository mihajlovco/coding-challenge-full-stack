import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql
  type Image {
    slug: String!
    name: String!
    originalUrl: String
    thumbnailUrl: String
  }

  type Query {
    images: [Image],
    filterImages(name: String): [Image]
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
