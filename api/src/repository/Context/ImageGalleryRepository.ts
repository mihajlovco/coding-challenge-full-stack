import { BaseRepository } from "../Base/BaseRepository";
import { IImageGalleryRepository } from "../Base/IImageGalleryRepository";
import Image from "../../core/models/Image";
import ImageModel from "../../models/ImageModel";
import Image from "../../core/entities/Image";
import { ThumbnailImg } from "../../../../app/src/types/Images";

export class ImageGalleryRepository extends BaseRepository implements IImageGalleryRepository {
  private mapImageToImageModel(image: Image): ImageModel {
    if (!image) {
      return image;
    }
    const imageModel = {
      ...image,
      originalUrl: `/image/${image.slug}`,
      thumbnailUrl: `/image/${image.slug}?&t`,
    } as ImageModel;
    return imageModel;
  }

  async create(fileBuffer: Buffer, name: string, type: string): ImageModel {
    const slug = `${uuidv4()}.${type}`;
    await saveOriginalImage(req.file.buffer, slug);
    await saveThumbnailImage(req.file.buffer, slug);
    const newImage = {
      slug,
      name,
    };
    // add to db
    this.db.galleryImages.push(newImage);
    return this.mapImageToImageModel(newImage);
  }

  delete(slug: string): ImageModel {
    const imageModels = this.db.galleryImages.map((image) => this.mapImageToImageModel(image));
    return imageModels[0];
  }

  update(image: Image): ImageModel {
    return {};
  }

  getAll(): ImageModel[] {
    const imageModels = this.db.galleryImages.map((image) => this.mapImageToImageModel(image));
    return imageModels;
  }

  filter(name: string): ImageModel[] {
    if (!name?.length) {
      return [];
    }
    const imageModels = this.getAll().filter((image) => image.name.includes(name));
    return imageModels;
  }
}
