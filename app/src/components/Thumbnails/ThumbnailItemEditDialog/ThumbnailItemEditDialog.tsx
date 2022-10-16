import React, { useState, useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ImageModel from "../../../graphql/types/ImageModel";
import { ImageGalleryContext } from "../../../contexts/ImageGalleryContext";
import { useUpdateGalleryImage } from "../../../hooks/useUpdateGalleryImage";
import { uploadImage } from "../../../../../api/src/controllers/imageGalleryController";

type ThumbnailItemEditDialogProps = {
  image: ImageModel;
  handleClose: () => void;
};

const ThumbnailItemEditDialog: React.FC = ({ image, onClose }: ThumbnailItemEditDialogProps) => {
  const { data, loading, updateImage, error } = useUpdateGalleryImage();
  const [imageData, setImageData] = useState<ImageModel | null>(image);
  const [errorMsg, setErrorMsg] = useState(null);
  const { refetch } = useContext(ImageGalleryContext);

  const hasError = error || errorMsg;

  useEffect(() => {
    if (!loading && data) {
      refetch();
      onClose();
    }
  }, [data, loading]);

  const handleInputChange = (e) => {
    if (errorMsg) {
      setErrorMsg(null);
    }
    setImageData({ ...imageData, name: e.currentTarget.value });
  };

  const handleConfirm = () => {
    if (imageData.name.length === 0) {
      setErrorMsg("Please enter image name.");
      return;
    }
    const { slug, name } = imageData;
    updateImage({ slug, name });
  };

  return (
    <Dialog open={!!imageData} onClose={() => onClose()}>
      <DialogTitle>Edit image name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change the image name, please enter text in the input field na confirm your change.
        </DialogContentText>
        <TextField
          error={hasError}
          autoFocus
          margin="dense"
          id="name"
          label="Image name"
          type="text"
          fullWidth
          variant="standard"
          name="name"
          helperText={error ? "Error please try to confirm again." : errorMsg}
          value={imageData.name}
          onChange={(e) => handleInputChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={() => onClose()}>
          Cancel
        </Button>
        <Button disabled={loading} onClick={() => handleConfirm()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThumbnailItemEditDialog;
