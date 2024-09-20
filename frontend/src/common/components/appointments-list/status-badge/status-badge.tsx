import { ReactElement } from 'react';
import { Box, styled, Typography } from '@mui/material';
import { AppointmentStatusesEnum, AppointmentTimeLabels } from '../../../../enums/appointment-statuses.enum';
import { colors } from '../../../../config/theme/colors';

const Badge = styled(Box)(
  () => `
    width: fit-content;
    margin: 4px 0;
    padding: 2px 8px;
    border-radius: 3px;
`,
);

const getColorByStatus = (status: AppointmentStatusesEnum) => {
  switch (status) {
    case AppointmentStatusesEnum.NEW:
      return 'primary';
    case AppointmentStatusesEnum.PENDING:
      return 'warning';
    case AppointmentStatusesEnum.ACCEPTED:
      return 'success';
    case AppointmentStatusesEnum.STARTED:
      return 'success';
    case AppointmentStatusesEnum.FINISHED:
      return 'secondary';
    case AppointmentStatusesEnum.CANCELED:
      return 'error';

    default:
      return 'primary';
  }
};

interface Props {
  status: AppointmentStatusesEnum;
}

const StatusBadge = ({ status }: Props): ReactElement => {
  return (
    <Badge
      sx={{
        background: colors[getColorByStatus(status)][20],
        color: colors[getColorByStatus(status)][70],
      }}
    >
      <Typography variant="body2" fontWeight={600}>
        {AppointmentTimeLabels[status]}
      </Typography>
    </Badge>
  );
};

export default StatusBadge;
