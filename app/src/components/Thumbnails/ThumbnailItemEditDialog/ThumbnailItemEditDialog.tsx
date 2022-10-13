import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThumbnailImg } from "../../../types/Images";

type ThumbnailItemEditDialogProps = {
  item: ThumbnailImg;
  handleClose: () => void;
};

const ThumbnailItemEditDialog: React.FC = ({ item, onClose }: ThumbnailItemEditDialogProps) => {
  console.log(item);
  const [itemData, setItemData] = useState<ThumbnailImg | null>(item);

  const handleInputChange = (e) => {
    setItemData({ ...itemData, name: e.currentTarget.value });
  };

  const handleConfirm = () => {
    // update thumbnail
  };

  return (
    <Dialog open={!!itemData} onClose={() => onClose()}>
      <DialogTitle>Edit image name</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To change the image name please enter name in the input na confirm your change.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Image name"
          type="text"
          fullWidth
          variant="standard"
          name="name"
          value={itemData.name}
          onChange={(e) => handleInputChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button onClick={() => handleConfirm()}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ThumbnailItemEditDialog;
