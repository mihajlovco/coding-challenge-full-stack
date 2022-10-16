import React from "react";
import { useQuery, gql } from "@apollo/client";
import ImageModel from "../graphql/types/ImageModel";

const FILTER_ALL_GALLERY_IMAGES = gql`
  query FilterImages($input: FilterImagesInput!) {
    filterImages(input: $input) {
      slug
      name
      originalUrl
      thumbnailUrl
    }
  }
`;

interface FilterImageGallery {
  loading: boolean;
  query: (query: { name: string }) => void;
  data: ImageModel[];
  error: unknown;
}

export const useFilterImageGallery = () => {
  const { data, loading, error, refetch } = useQuery(FILTER_ALL_GALLERY_IMAGES);

  const refetchQuery = ({ name }) => {
    refetch({
      input: { name },
    });
  };

  return {
    loading,
    query: refetchQuery,
    data: data?.filterImages,
    error,
  };
};
