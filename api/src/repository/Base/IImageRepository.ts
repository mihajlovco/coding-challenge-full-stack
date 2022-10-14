import React from "react";
import IRepository from "./IRepository";

export interface IImageRepository {
  filter: () => void;
}
