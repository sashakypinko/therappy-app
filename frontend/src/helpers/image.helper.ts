import { ImageSizesEnum } from '../enums/image-sizes.enum';

export const getImagePath = (id: number, size: ImageSizesEnum = ImageSizesEnum.ORIGINAL) =>
  `${process.env.REACT_APP_API_URL}/media/${id}?size=${size}`;
