import React from "react";
import { useMutation, gql } from "@apollo/client";
import ImageModel from "../graphql/types/ImageModel";

const UPDATE_GALLERY_IMAGE = gql`
  mutation UpdateImage($input: UpdateImageInput!) {
    updateImage(input: $input) {
      slug
      name
    }
  }
`;

interface UpdateImageGallery {
  data: ImageModel;
  loading: boolean;
  updateImage: (data: { slug: string; name: string }) => void;
  error: unknown;
}

export const useUpdateGalleryImage = (): UpdateImageGallery => {
  const [updateImageData, { data, loading, error }] = useMutation(UPDATE_GALLERY_IMAGE);

  const updateImage = async (data: { slug: string; name: string }) => {
    updateImageData({ variables: { input: { slug: data.slug, name: data.name } } });
  };

  return { data, loading, updateImage, error };
};
