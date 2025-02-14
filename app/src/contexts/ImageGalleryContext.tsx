import React from "react";
import { useImageGallery } from "../hooks/useImageGallery";

const INIT_DATA = {};

export const ImageGalleryContext = React.createContext(INIT_DATA);

export const ImageGalleryProvider: React.FC = ({ children }) => {
  const { data, loading, error, refetch } = useImageGallery();
  return (
    <ImageGalleryContext.Provider value={{ data, loading, error, refetch }}>
      {children}
    </ImageGalleryContext.Provider>
  );
};
