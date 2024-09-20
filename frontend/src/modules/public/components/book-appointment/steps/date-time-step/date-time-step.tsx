import React, { ReactElement } from 'react';
import { StepProps } from '../../book-appointment';
import { Box, Grid, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import AppointmentDatePicker from '../../../../../../common/components/appointment-date-picker';
import { TimeRange } from '../../../../../../services/api/appointment/dto/appointment.dto';
import { AppointmentTimeTypesEnum } from '../../../../../../enums/appointment-time-types.enum';
import useWorkingHours from '../../../../../../hooks/use-working-hours.hook';
import Button from '../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';

const DateTimeContainer = styled(Box)(
  () => `
   border-radius: 12px;
   border: 1px solid ${colors.secondary[30]};
   background: ${colors.background.BG_1};
`,
);

const DateTimeStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const hours = useWorkingHours();

  const handleDateChange = (date: string | null) => {
    setAppointment({ ...appointment, date });
  };

  const handleIntervalsChange = (intervals: TimeRange[]) => {
    setAppointment({ ...appointment, intervals });
  };

  const handleTimeTypeChange = (timeType: AppointmentTimeTypesEnum) => {
    setAppointment({
      ...appointment,
      timeType,
      intervals: timeType === AppointmentTimeTypesEnum.SPECIFIC ? [{ start: hours[0], end: hours[5] }] : [],
    });
  };

  return (
    <Grid sx={{ mb: 3 }} container spacing={3}>
      <Grid item display="flex" justifyContent="center" xs={12}>
        <Box textAlign="center" maxWidth={700}>
          <Typography variant="h3">When you want this therapy?</Typography>
          <Typography sx={{ mt: 1 }} variant="h6">
            Choose a date and time for this therapy and we&apos;ll match to you a therapist
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <DateTimeContainer>
          <AppointmentDatePicker
            date={appointment.date}
            timeType={appointment.timeType}
            selectedIntervals={appointment.intervals}
            onDateChange={handleDateChange}
            onIntervalsChange={handleIntervalsChange}
            onTimeTypeChange={handleTimeTypeChange}
          />
        </DateTimeContainer>
      </Grid>
      <Grid sx={{ mt: 1, mb: 4 }} display="flex" justifyContent="end" item xs={12}>
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.SERVICE)}>
          Back
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.TYPE)}
          disabled={!appointment.date}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default DateTimeStep;
