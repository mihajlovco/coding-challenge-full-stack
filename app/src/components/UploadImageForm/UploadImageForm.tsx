import React, { useState, useContext } from "react";
import axios from "axios";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { MyContainer } from "./UploadImageForm.styles";
import defaultUploadImg from "../../images/default-upload-img.png";
import { ImageGalleryApi } from "../../api/ImageGalleryApi";
import { ImageGalleryContext } from "../../contexts/ImageGalleryContext";

const mainContainerStyles = {
  borderBottom: 1,
  borderColor: "#E1E1E1",
  margin: "25px 0",
  display: "flex",
  flexDirection: "row",
  padding: "20px 0",
};

/** Thumbnail image styles */
const thumbnailImgBoxStyles = {
  borderRadius: 2,
  border: 1,
  borderColor: "#E1E1E1",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: 110,
  height: 110,
};

const thumbnailImgStyles = {
  width: 100,
  height: 100,
  borderRadius: 5,
  objectFit: "cover",
};

const UploadImageForm = () => {
  const [imageData, setImageData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { refetch } = useContext(ImageGalleryContext);

  const handleOnImageSelect = (e) => {
    setImageData(e.target.files[0]);
  };

  const handleOnCancelClick = () => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    setImageData(null);
  };

  const applyThumbnailImage = () => {
    return imageData ? URL.createObjectURL(imageData) : defaultUploadImg;
  };

  const handleOnUploadClick = async () => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    const bodyFormData = new FormData();
    bodyFormData.append("file", imageData);
    ImageGalleryApi.upload(bodyFormData)
      .then(function (response) {
        setImageData(null);
        refetch();
      })
      .catch(function (response) {
        setErrorMsg("Please check the maximum file limit and image format in description.");
      });
  };

  return (
    <Container sx={mainContainerStyles}>
      <Stack spacing={2} direction="row">
        <Box sx={thumbnailImgBoxStyles}>
          <img
            style={thumbnailImgStyles}
            alt="not fount"
            width={100}
            height={100}
            src={applyThumbnailImage()}
          />
        </Box>
        <Box>
          <Typography variant="h5">Upload image</Typography>
          <ul>
            <li>300x300 or higher recommended. Max upload size is 5MB.</li>
            <li>Supported image files: png, jpg and jpeg.</li>
          </ul>
          {errorMsg && (
            <Alert sx={{ marginBottom: 3 }} severity="error">
              {errorMsg}
            </Alert>
          )}
          <Stack spacing={2} direction="row">
            {!imageData && (
              <Button variant="contained" component="label">
                Select
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => handleOnImageSelect(e)}
                />
              </Button>
            )}
            {imageData && (
              <>
                <Button variant="contained" component="label" onClick={() => handleOnUploadClick()}>
                  Upload
                </Button>
                <Button component="label" onClick={() => handleOnCancelClick()}>
                  Cancel
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default UploadImageForm;
