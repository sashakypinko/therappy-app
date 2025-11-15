import { FileExtensionsEnum } from '../../../../enums/file-extensions.enum';

export interface IAttachment {
  id?: number;
  name: string;
  extension: FileExtensionsEnum;
  size: number;
  url?: string;
}
