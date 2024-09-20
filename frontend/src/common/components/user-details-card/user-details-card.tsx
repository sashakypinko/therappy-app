import { Box, styled, Typography } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';
import UserStatusBadge from '../user-status-badge';
import { TablerIconMoodKid } from '../../ui/icon-v2';
import { UserStatusesEnum } from '../../../enums/user-statuses.enum';

const Image = styled('img')(
  () => `
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
`,
);

interface Props {
  image: string;
  name: string;
  status?: UserStatusesEnum;
  subtitle?: ReactNode | string;
  workWithChildren?: boolean;
}

const UserDetailsCard = ({ image, name, status, subtitle, workWithChildren }: Props): ReactElement => {
  return (
    <Box display="flex" alignItems="center">
      <Image src={image} />
      <Box>
        <Typography sx={{ mb: 1 }} display="flex" alignItems="center" variant="h6">
          {name}
          {status !== undefined && <UserStatusBadge status={status} />}
          {!!workWithChildren && <TablerIconMoodKid />}
        </Typography>
        {subtitle && subtitle}
      </Box>
    </Box>
  );
};

export default UserDetailsCard;
