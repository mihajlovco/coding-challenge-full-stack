import React, { useState, useEffect } from "react";
import ImageList from "@mui/material/ImageList";
import { ThumbnailImg } from "../../types/Images";
import { ThumbnailListItem } from "../ThumbnailListItem/ThumbnailListItem";
import ThumbnailItemEditDialog from "../ThumbnailItemEditDialog/ThumbnailItemEditDialog";
import ThumbnailItemRemoveDialog from "../ThumbnailItemRemoveDialog/ThumbnailItemRemoveDialog";
import { useImageGallery } from "../../hooks/useImageGallery";
import ImageModel from "../../../graphql/types/ImageModel";

const enum EditAction {
  Edit,
  Remove,
}

type ThumbnailListProps = {
  images: ImageModel[];
};

const ThumbnailList: React.FC = ({ images }: ThumbnailListProps) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<{
    item: ImageModel;
    action: EditAction;
  } | null>(null);

  const hasImages = !!images?.length;
  return (
    <>
      {selectedThumbnail && EditAction.Edit === selectedThumbnail.action && (
        <ThumbnailItemEditDialog
          image={selectedThumbnail.image}
          onClose={() => setSelectedThumbnail(null)}
        />
      )}
      {selectedThumbnail && EditAction.Remove === selectedThumbnail.action && (
        <ThumbnailItemRemoveDialog
          image={selectedThumbnail.image}
          onClose={() => setSelectedThumbnail(null)}
        />
      )}
      <ImageList rowHeight={200} cols={hasImages ? 4 : 1}>
        {hasImages ? (
          images.map((image: ImageModel) => (
            <ThumbnailListItem
              key={image.slug}
              data={image}
              onEdit={(imageData) =>
                setSelectedThumbnail({ image: imageData, action: EditAction.Edit })
              }
              onRemove={(imageData) =>
                setSelectedThumbnail({ image: imageData, action: EditAction.Remove })
              }
            />
          ))
        ) : (
          <div>Image gallery is empty, please upload image.</div>
        )}
      </ImageList>
    </>
  );
};

export default ThumbnailList;
