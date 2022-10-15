import React from "react";
import IRepository from "./IRepository";
import ImageModel from '../../models/ImageModel';
import Image from '../../core/entities/Image';

export interface IImageGalleryRepository {
  create: (fileBuffer: Buffer, name: string, mimeType: string): () => ImageModel;
  delete: (slug: string) => ImageModel | null;
  update: (image: Image) => ImageModel;
  getAll: () => ImageModel[];
  filter: (name: string) => ImageModel[];
  getBySlug: (slug: string) => ImageModel | null;
}
