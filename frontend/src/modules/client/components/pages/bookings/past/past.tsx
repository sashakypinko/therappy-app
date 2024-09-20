import { ReactElement, ReactNode } from 'react';
import { TabProps } from '../bookings';
import AppointmentsList from '../../../../../../common/components/appointments-list';
import { getImagePath } from '../../../../../../helpers/image.helper';
import { IService } from '../../../../../../services/api/service/dto/service.dto';
import { Box, Typography } from '@mui/material';
import StatusBadge from '../../../../../../common/components/appointments-list/status-badge';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import { formatTime } from '../../../../../../helpers/date-time.helper';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../../../store/selectors';
import { colors } from '../../../../../../config/theme/colors';
import dayjs from 'dayjs';
import { ImageSizesEnum } from '../../../../../../enums/image-sizes.enum';

const Past = ({
  updateListRef,
  onFeedbackAppointmentOpen,
  onRebookAppointmentOpen,
  onShowAppointmentOpen,
}: TabProps): ReactElement => {
  const { services } = useSelector(selectServices);

  return (
    <>
      <AppointmentsList
        type="past"
        updateListRef={(method) => (updateListRef.current = method)}
        dataMap={{
          image: ({ service_id }) =>
            getImagePath(
              services.data.find(({ id }: IService) => id === service_id)?.image_id || 0,
              ImageSizesEnum.SMALL,
            ),
          title: ({ service_id, status }) => (
            <Box display="flex" alignItems="center">
              {services.data.find(({ id }: IService) => id === service_id)?.name || ''}
              <Box sx={{ ml: 2 }}>
                <StatusBadge status={status} />
              </Box>
            </Box>
          ),
          subtitle: ({ date, start, end }: IAppointment): ReactNode => (
            <>
              <Typography variant="body2" fontSize={14} fontWeight={600} color={colors.secondary[70]}>
                {formatTime(start || '')} - {formatTime(end || '')}
              </Typography>
              <Typography variant="body2" fontSize={14} fontWeight={600} color={colors.secondary[70]}>
                {dayjs(date, 'YYYY-MM-DD').format('dddd, D MMMM YYYY')}
              </Typography>
            </>
          ),
          description: (item) => (
            <Box display="grid">
              {item.therapist && (
                <Typography variant="body2" fontSize={14}>
                  Therapist {item.therapist.first_name} {item.therapist.last_name}
                </Typography>
              )}
              <Typography
                sx={{
                  cursor: 'pointer',
                  color: colors.primary[70],
                  fontSize: 16,
                  fontWeight: 600,
                  mt: 1,
                }}
                onClick={() => onFeedbackAppointmentOpen(item)}
              >
                Leave Feedback
              </Typography>
            </Box>
          ),
        }}
        actions={() => [
          {
            label: 'Details',
            onClick: onShowAppointmentOpen,
          },
          {
            label: 'Rebook',
            variant: 'contained',
            onClick: onRebookAppointmentOpen,
          },
        ]}
      />
    </>
  );
};

export default Past;
