import React from "react";
import { useMutation, gql } from "@apollo/client";
import ImageModel from "../graphql/types/ImageModel";

const DELETE_GALLERY_IMAGE = gql`
  mutation DeleteImage($input: DeleteImageInput!) {
    deleteImage(input: $input) {
      slug
    }
  }
`;

interface DeleteGalleryImage {
  data: ImageModel;
  loading: boolean;
  deleteImage: (slug: string) => void;
  error: unknown;
}

export const useDeleteGalleryImage = (): DeleteGalleryImage => {
  const [deleteImageData, { data, loading, error }] = useMutation(DELETE_GALLERY_IMAGE);

  const deleteImage = async (slug: string) => {
    deleteImageData({ variables: { input: { slug } } });
  };

  return { data, loading, deleteImage, error };
};
