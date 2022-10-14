import { ApolloServer } from "@apollo/server";

export const typeDefs = `#graphql

  # This "WImage" type defines the queryable fields for every Webily image in our data source.
  type Image {
    slug: String!
    name: String!
    originalUrl: String
    thumbnailUrl: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    images: [Image],
    filterImages(name: String): [Image]
  }
`;
