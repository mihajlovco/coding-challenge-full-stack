import React, { useState } from "react";
import ImageList from "@mui/material/ImageList";
import useThumbnails from "../../hooks/useThumbnails";
import { ThumbnailImg } from "../../types/Images";
import { ThumbnailListItem } from "../ThumbnailListItem/ThumbnailListItem";
import ThumbnailItemEditDialog from "../ThumbnailItemEditDialog/ThumbnailItemEditDialog";
import ThumbnailItemRemoveDialog from "../ThumbnailItemRemoveDialog/ThumbnailItemRemoveDialog";

const enum EditAction {
  Edit,
  Remove,
}

const ThumbnailList: React.FC = () => {
  const { data } = useThumbnails();
  const [selectedThumbnail, setSelectedThumbnail] = useState<{
    item: ThumbnailImg;
    action: EditAction;
  } | null>(null);
  return (
    <>
      {selectedThumbnail && EditAction.Edit === selectedThumbnail.action && (
        <ThumbnailItemEditDialog
          item={selectedThumbnail.item}
          onClose={() => setSelectedThumbnail(null)}
        />
      )}

      {selectedThumbnail && EditAction.Remove === selectedThumbnail.action && (
        <ThumbnailItemRemoveDialog
          item={selectedThumbnail.item}
          onClose={() => setSelectedThumbnail(null)}
        />
      )}
      <ImageList rowHeight={200} cols={4}>
        {data.map((item: ThumbnailImg) => (
          <ThumbnailListItem
            key={item.url}
            data={item}
            onEdit={(item) => setSelectedThumbnail({ item, action: EditAction.Edit })}
            onRemove={(item) => setSelectedThumbnail({ item, action: EditAction.Remove })}
          />
        ))}
      </ImageList>
    </>
  );
};

export default ThumbnailList;
