import ImageModel from "../graphql/types/ImageModel";
import axios from "axios";
import { BASE_API_URL } from "./BaseApi";

export class ImageGalleryApi {
  static async upload(formData: FormData): Promise<ImageModel> {
    return axios({
      method: "post",
      url: `${BASE_API_URL}/upload`,
      data: formData,
      headers: { enctype: "multipart/form-data" },
    });
  }
}
