import { ReactElement } from 'react';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { IAppointment } from '../../../../../../services/api/appointment/dto/appointment.dto';
import { CheckMarkCircle } from '../../../../../../common/ui/icon-v2';
import { AppointmentStatusesEnum } from '../../../../../../enums/appointment-statuses.enum';
import dayjs from 'dayjs';
import { colors } from '../../../../../../config/theme/colors';
import { IService } from '../../../../../../services/api/service/dto/service.dto';
import { CategoryLabels, ServiceCategoriesEnum } from '../../../../../../enums/service-categories.enum';
import { useSelector } from 'react-redux';
import { selectServices } from '../../../../../../store/selectors';

interface Props {
  appointments: IAppointment[];
}

const AppointmentsChecklist = ({ appointments }: Props): ReactElement | null => {
  const { services, loading } = useSelector(selectServices);

  if (loading) {
    return null;
  }

  return (
    <Box sx={{ maxWidth: 400, p: 4 }}>
      <Stepper
        activeStep={appointments.length}
        orientation="vertical"
        connector={
          <Box
            sx={{
              borderLeft: `1px dashed ${colors.secondary[30]}`,
              height: 32,
              ml: 3,
            }}
          />
        }
      >
        {appointments.map((appointment) => {
          const isPast = appointment.status === AppointmentStatusesEnum.FINISHED;
          const categoryId = services.data.find(({ id }: IService) => appointment.service_id === id)
            ?.category_id as ServiceCategoriesEnum;

          return (
            <Step key={appointment.id}>
              <StepLabel
                StepIconComponent={() =>
                  isPast ? (
                    <CheckMarkCircle sx={{ minWidth: 50 }} />
                  ) : (
                    <Typography variant="body2" fontWeight={600} minWidth={50} color={colors.primary[50]}>
                      {dayjs(appointment?.start, 'HH:mm:ss').format('h a')}
                    </Typography>
                  )
                }
              >
                <Typography
                  variant="body2"
                  sx={{ ml: 2 }}
                  color={isPast ? colors.success[70] : colors.secondary[90]}
                  fontWeight={isPast ? 500 : 600}
                >
                  {CategoryLabels[categoryId]}
                </Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default AppointmentsChecklist;
