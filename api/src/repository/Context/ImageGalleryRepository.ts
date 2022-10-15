import { v4 as uuidv4 } from "uuid";
import { BaseRepository } from "../Base/BaseRepository";
import { IImageGalleryRepository } from "../Base/IImageGalleryRepository";
import Image from "../../core/models/Image";
import ImageModel from "../../models/ImageModel";
import Image from "../../core/entities/Image";
import { ThumbnailImg } from "../../../../app/src/types/Images";
import { mapImageToImageModel } from "../../core/mappers/mapImageToImageModel";
import {
  saveOriginalImage,
  saveThumbnailImage,
  removeImageFromDisk,
} from "../../utils/file.storage.helpers";

export class ImageGalleryRepository extends BaseRepository implements IImageGalleryRepository {
  private mapImageToImageModel(image: Image): ImageModel {
    if (!image) {
      return image;
    }
    const imageModel = {
      ...image,
      originalUrl: `http://localhost:3000/image/${image.slug}`,
      thumbnailUrl: `http://localhost:3000/image/${image.slug}?size=thumbnail`,
    } as ImageModel;
    return imageModel;
  }

  async create(fileBuffer: Buffer, name: string, mimeType: string): ImageModel {
    const fileFormatType = mimeType.split("/")[1];
    const slug = `${uuidv4()}.${fileFormatType}`;
    await saveOriginalImage(fileBuffer, slug);
    await saveThumbnailImage(fileBuffer, slug);
    const newImage = {
      slug,
      name,
    };
    // add to db
    this.db.galleryImages.push(newImage);
    return this.mapImageToImageModel(newImage);
  }

  delete(slug: string): ImageModel | null {
    const imageIndex = this.db.galleryImages.findIndex((image) => image.slug === slug);
    if (imageIndex < 0) {
      return null;
    }
    const deleteImage = this.db.galleryImages[imageIndex];
    const imageModel = { ...deleteImage };
    // remove on disk
    removeImageFromDisk(deleteImage.slug);
    this.db.galleryImages.splice(imageIndex, 1);
    return this.mapImageToImageModel({ ...imageModel });
  }

  update(image: Image): ImageModel {
    const foundImage = this.db.galleryImages.find((gImage) => gImage.slug === image.slug);
    if (!foundImage) {
      return image;
    }
    foundImage.name = image.name;
    return this.mapImageToImageModel(foundImage);
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
