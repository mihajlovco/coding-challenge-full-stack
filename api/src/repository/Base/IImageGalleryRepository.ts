import React from "react";
import { v4 as uuidv4 } from "uuid";
import IRepository from "./IRepository";
import ImageModel from '../../models/ImageModel';
import Image from '../../core/entities/Image';

export interface IImageGalleryRepository {
  create: (fileBuffer: Buffer, name: string, type: string): () => ImageModel;
  delete: (slug: string) => ImageModel;
  update: (image: Image) => ImageModel;
  getAll: () => ImageModel[];
  filter: (name: string) => ImageModel[];
  getBySlug: (slug: string) => ImageModel;
}
