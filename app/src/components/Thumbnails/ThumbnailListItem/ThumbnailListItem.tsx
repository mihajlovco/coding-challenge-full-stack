import React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageModel from "../../../graphql/types/ImageModel";

type ThumbnailItemMenuProps = {
  onEdit: (data: ImageModel) => void;
  onRemove: (data: ImageModel) => void;
};

export default function ThumbnailItemMenu({ onEdit, onRemove }: ThumbnailItemMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="more"
        aria-controls={open ? "thumbnail-item-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={(e) => handleClick(e)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="thumbnail-item-menu"
        anchorEl={anchorEl}
        open={open}
        onClick={(e) => handleClose(e)}
      >
        <MenuItem onClick={() => onEdit()}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => onRemove()}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

type ThumbnailListItemProps = {
  data: ImageModel;
  onEdit: (data: ImageModel) => void;
  onRemove: (data: ImageModel) => void;
};

export const ThumbnailListItem: React.FC = (props: ThumbnailListItemProps) => {
  const { data, onEdit, onRemove } = props;
  return (
    <ImageListItem key={data.thumbnailUrl}>
      <img src={data.thumbnailUrl} alt={data.name} loading="lazy" />
      <ImageListItemBar
        title={data.name}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${data.name}`}
          >
            <ThumbnailItemMenu
              onEdit={() => onEdit({ ...data })}
              onRemove={() => onRemove({ ...data })}
            />
          </IconButton>
        }
      />
    </ImageListItem>
  );
};
