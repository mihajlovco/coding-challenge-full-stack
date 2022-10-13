import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import useThumbnails from "../../hooks/useThumbnails";
import { ThumbnailImg } from "../../types/Images";
import { ThumbnailListItem } from "../ThumbnailListItem/ThumbnailListItem";
import ThumbnailItemEditDialog from "../ThumbnailItemEditDialog/ThumbnailItemEditDialog";

const ThumbnailList: React.FC = () => {
  const { data } = useThumbnails();
  const [editThumbnailItem, setEditThumbnailItem] = useState<ThumbnailImg | null>(null);
  return (
    <>
      {editThumbnailItem && (
        <ThumbnailItemEditDialog
          item={editThumbnailItem}
          onClose={() => setEditThumbnailItem(null)}
        />
      )}
      <ImageList rowHeight={200} cols={4}>
        {data.map((item: ThumbnailImg) => (
          <ThumbnailListItem
            key={item.url}
            data={item}
            onEdit={(item) => setEditThumbnailItem(item)}
          />
        ))}
      </ImageList>
    </>
  );
};

export default ThumbnailList;
