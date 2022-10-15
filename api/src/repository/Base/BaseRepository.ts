import IRepository from "./IRepository";
import { GalleryImages } from "../db";

export class BaseRepository {
  protected db: { galleryImages: GalleryImages };
  constructor() {
    this.db = { galleryImages: GalleryImages };
  }
}
