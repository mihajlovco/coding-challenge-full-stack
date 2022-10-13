import React from "react";
import Container from "@mui/material/Container";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import ThumbnailList from "../components/Thumbnails/ThumbnailList/ThumbnailList";

const ImageGalleryContainer: React.FC = () => {
  return (
    <Container sx={{ marginBottom: 10 }}>
      <UploadImageForm />
      <ThumbnailList />
    </Container>
  );
};

export default ImageGalleryContainer;
