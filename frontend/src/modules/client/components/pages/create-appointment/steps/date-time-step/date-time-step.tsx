import React, {ReactElement, useState} from 'react';
import { Box, Grid, styled, Theme, Typography, useTheme } from '@mui/material';
import StepsEnum from '../../enums/steps.enum';
import { colors } from '../../../../../../../config/theme/colors';
import { StepProps } from '../../create-appointment';
import useWorkingHours from '../../../../../../../hooks/use-working-hours.hook';
import { TimeRange } from '../../../../../../../services/api/appointment/dto/appointment.dto';
import { AppointmentTimeTypesEnum } from '../../../../../../../enums/appointment-time-types.enum';
import AppointmentDatePicker from '../../../../../../../common/components/appointment-date-picker';
import Button from '../../../../../../../common/ui/button';
import {boolean, string} from "yup";
import dayjs from "dayjs";
import Modal from "../../../../../../../common/ui/modal";

const DateTimeContainer = styled(Box)(
  () => `
    width: 100%;
    border-radius: 12px;
    border: 1px solid ${colors.secondary[30]};
    background: ${colors.background.BG_1};
`,
);

const ModalContainer = styled(Grid)(
    () => `
    width: 100%;
`,
);

const DateTimeStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const hours = useWorkingHours();
  const theme: Theme = useTheme();

  const [finalMsg, setFinalMsg] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);


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

  const handleGoToStepType = () => {
    const ranges = getNotValidRanges(appointment?.intervals)
    let msg = ''
    if (ranges?.length) {
        msg = getRangeErrorMsg(ranges)
        setFinalMsg(`The time range(s) ${msg} you have chosen is not valid.Please select a different time range and try again.`)
        setTimeout(() => {
          setOpenModal(true)
        }, 100)
    } else {
      setFinalMsg('')
      setOpenModal(false)
      setActiveStep(StepsEnum.TYPE)
    }
  }

  const getNotValidRanges = (intervals: TimeRange[]) => {
    let notValidRanges: TimeRange[] = []

    for (let i = 0; i < intervals.length; i++) {
      if (!isValidRange(intervals[i]?.start, intervals[i]?.end)) {
        notValidRanges = [...notValidRanges, {start: intervals[i]?.start, end: intervals[i]?.end}]
      }
    }

    return notValidRanges
  }

  const handleClose = (): void => {
    setOpenModal(false)
  };

  const isValidRange = (start: string, end: string) => {
    const startDate = new Date('1970-01-01T' + start + 'Z')
    const endDate = new Date('1970-01-01T' + end + 'Z')
    return !(startDate > endDate)
  }

  const getRangeErrorMsg = (intervals: TimeRange[]) => {
    let msg = ''

    for (let i = 0; i < intervals.length; i++) {
      const startLabel = dayjs(intervals[i]?.start, 'HH:mm:ss').format('hh:mm A')
      const endLabel = dayjs(intervals[i]?.end, 'HH:mm:ss').format('hh:mm A')

      msg += `${startLabel}-${endLabel},`
    }

    return msg
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        Choose a date and time for this therapy and we&apos;ll match to you a therapist
      </Typography>
      <Box display="flex" justifyContent="center">
        <DateTimeContainer maxWidth={theme.breakpoints.values.md}>
          <AppointmentDatePicker
            date={appointment.date}
            timeType={appointment.timeType}
            selectedIntervals={appointment.intervals}
            onDateChange={handleDateChange}
            onIntervalsChange={handleIntervalsChange}
            onTimeTypeChange={handleTimeTypeChange}
          />
        </DateTimeContainer>
      </Box>
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.SERVICE)}>
          Back
        </Button>
        <Button variant="contained" onClick={() => handleGoToStepType()} disabled={!appointment.date}>
          Next
        </Button>
      </Box>

      <Modal
          title='Invalid ranges Warning'
          open={openModal}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
      >
        <ModalContainer>
          <Grid item md={12}>
            <div>{finalMsg}</div>
          </Grid>
          <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
            <Button variant="contained" color="error" onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </Box>
        </ModalContainer>
      </Modal>
    </Box>
  );
};

export default DateTimeStep;
