import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThumbnailImg } from "../../../types/Images";

type ThumbnailItemRemoveDialogProps = {
  item: ThumbnailImg;
  handleClose: () => void;
};

const ThumbnailItemRemoveDialog: React.FC = ({ item, onClose }: ThumbnailItemRemoveDialogProps) => {
  const handleConfirm = () => {
    // NOTE: update thumbnail name with GraphQL API
    onClose();
  };

  return (
    <Dialog open={!!item} onClose={() => onClose()}>
      <DialogTitle>Remove image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <span>{item.name}</span> image?
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
