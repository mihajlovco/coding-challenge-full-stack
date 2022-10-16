import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Alert from "@mui/material/Alert";
import DialogTitle from "@mui/material/DialogTitle";
import { ImageGalleryContext } from "../../../contexts/ImageGalleryContext";
import { useDeleteGalleryImage } from "../../../hooks/useDeleteGalleryImage";
import ImageModel from "../../../graphql/types/ImageModel";

type ThumbnailItemRemoveDialogProps = {
  image: ImageModel;
  handleClose: () => void;
};

const ThumbnailItemRemoveDialog: React.FC = ({
  image,
  onClose,
}: ThumbnailItemRemoveDialogProps) => {
  const { data, loading, deleteImage, error } = useDeleteGalleryImage();
  const { refetch } = useContext(ImageGalleryContext);

  useEffect(() => {
    if (!loading && data) {
      refetch();
      onClose();
    }
  }, [data, loading]);

  const handleConfirm = () => {
    deleteImage(image.slug);
  };

  return (
    <Dialog open={!!image} onClose={() => onClose()}>
      <DialogTitle>Remove image</DialogTitle>
      {error && <Alert severity="error">Unable to delete photo, please try again.</Alert>}
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove image
          <span>
            <b>{` ${image.name}`}</b>
          </span>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => handleConfirm()}>Remove</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThumbnailItemRemoveDialog;
