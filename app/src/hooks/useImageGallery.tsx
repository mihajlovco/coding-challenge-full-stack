import React from "react";
import { useQuery, gql } from "@apollo/client";

const QUERY_ALL_GALLERY_IMAGES = gql`
  query GetAllGalleryImages {
    images {
      slug
      name
      originalUrl
      thumbnailUrl
    }
  }
`;

export const useImageGallery = () => {
  return useQuery(QUERY_ALL_GALLERY_IMAGES);
};
