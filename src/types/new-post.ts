import { ImagePickerAsset } from "expo-image-picker";

export interface INewPost {
  content: string;
  media: ImagePickerAsset[];
}
