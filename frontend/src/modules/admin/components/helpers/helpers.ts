import { UserStatusesEnum } from '../../../../enums/user-statuses.enum';
import { colors } from '../../../../config/theme/colors';
import { FileExtensionsEnum } from '../../../../enums/file-extensions.enum';

export const getColorByProviderStatus = (status: UserStatusesEnum): string => {
  switch (status) {
    case UserStatusesEnum.DELETED:
      return colors.error[70];
    case UserStatusesEnum.DECLINED:
      return colors.error[70];
    case UserStatusesEnum.APPROVED:
      return colors.success[70];
    case UserStatusesEnum.PENDING:
      return colors.warning[60];
    case UserStatusesEnum.NEW:
      return colors.primary[60];
    case UserStatusesEnum.ACTIVE:
      return colors.success[60];
  }
};

export const getFileImageByExtension = (extension: string): string => {
  return `/img/file-${extension}.svg`;
};

export const bytesToMB = (bytes: number) => {
  return `${(bytes / (1024 * 1024)).toFixed(2)}M`;
};
