import React, { useContext, useState, useEffect, useRef } from "react";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import UploadImageForm from "../components/UploadImageForm/UploadImageForm";
import ThumbnailList from "../components/Thumbnails/ThumbnailList/ThumbnailList";
import { ImageGalleryContext } from "../contexts/ImageGalleryContext";
import { SearchInput } from "../components/Form/SearchInput";
import { useFilterImageGallery } from "../hooks/useFilterImageGallery";
import Box from "@mui/material/Box";

const ImageGalleryContainer: React.FC = () => {
  // Queries
  const {
    data,
    loading: getAllLoading,
    refetch: refetchAllImages,
  } = useContext(ImageGalleryContext);

  const {
    data: filterData,
    loading: filterLoading,
    query,
    error: filterError,
  } = useFilterImageGallery();

  // data states
  const [images, setImages] = useState<ImageModel[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const activeSearch = searchValue.length > 0;
  const dataIsLoading = filterLoading || getAllLoading;
  const imageListIsEmpty = !images?.length;

  useEffect(() => {
    if (data?.images) {
      setImages([...data?.images]);
    }
  }, [data?.images]);

  // Set filtered data by search
  useEffect(() => {
    if (activeSearch && filterData) {
      setImages([...filterData]);
    }
  }, [activeSearch, filterData]);

  useEffect(() => {
    if (activeSearch) {
      query({ name: searchValue });
      return;
    }
    // set all already fetched images
    if (data?.images) {
      setImages([...data?.images]);
    }
  }, [searchValue]);

  const handleOnSearchChange = (searchImageName: string) => {
    setSearchValue(searchImageName);
  };

  return (
    <Container sx={{ marginBottom: 10 }}>
      <UploadImageForm />
      <SearchInput onChange={(value) => handleOnSearchChange(value)} />
      <Box sx={{ margin: "10px 0" }}>
        {!dataIsLoading && activeSearch && imageListIsEmpty && (
          <Alert severity="info">
            We couldn't find any matches for
            <b>
              <i>"{searchValue}"</i>
            </b>
            .
          </Alert>
        )}
        {!dataIsLoading && !activeSearch && imageListIsEmpty && (
          <Alert severity="info">Image list is empty please upload image</Alert>
        )}
        {dataIsLoading && <div>Loading data...</div>}
      </Box>
      {!imageListIsEmpty && !dataIsLoading && <ThumbnailList images={images} />}
    </Container>
  );
};

export default ImageGalleryContainer;
