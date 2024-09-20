import { ReactElement } from 'react';
import { UserStatusesEnum } from '../../../enums/user-statuses.enum';
import {
  TablerIconProgress,
  TablerIconProgressActive,
  TablerIconProgressAlert,
  TablerIconProgressCheck,
  TablerIconProgressNew,
  TablerIconProgressX,
} from '../../ui/icon-v2';

interface Props {
  status: UserStatusesEnum;
}

const UserStatusBadge = ({ status }: Props): ReactElement | null => {
  if (status === UserStatusesEnum.NEW) {
    return <TablerIconProgressNew size={24} />;
  }
  if (status === UserStatusesEnum.PENDING) {
    return <TablerIconProgress size={24} />;
  }
  if (status === UserStatusesEnum.APPROVED) {
    return <TablerIconProgressCheck size={24} />;
  }
  if (status === UserStatusesEnum.ACTIVE) {
    return <TablerIconProgressActive size={24} />;
  }
  if (status === UserStatusesEnum.DECLINED) {
    return <TablerIconProgressAlert size={24} />;
  }
  if (status === UserStatusesEnum.DELETED) {
    return <TablerIconProgressX size={24} />;
  }

  return null;
};

export default UserStatusBadge;
