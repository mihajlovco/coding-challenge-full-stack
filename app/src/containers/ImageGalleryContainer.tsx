import React, { useContext } from "react";
import Container from "@mui/material/Container";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import ThumbnailList from "../components/Thumbnails/ThumbnailList/ThumbnailList";
import { ImageGalleryContext } from "../contexts/ImageGalleryContext";

const ImageGalleryContainer: React.FC = () => {
  const { data, isLoading } = useContext(ImageGalleryContext);
  console.log(data);
  return (
    <Container sx={{ marginBottom: 10 }}>
      <UploadImageForm />
      <ThumbnailList images={data?.images} />
    </Container>
  );
};

export default ImageGalleryContainer;
