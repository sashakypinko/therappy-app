import { Box, Divider, Grid, Typography } from '@mui/material';
import DateCalendar from '../../ui/calendar';
import React from 'react';
import { AppointmentTimeTypesEnum } from '../../../enums/appointment-time-types.enum';
import { TimeRange } from '../../../services/api/appointment/dto/appointment.dto';
import dayjs from 'dayjs';
import TimePicker from './time-picker';
import { colors } from '../../../config/theme/colors';
import SelectInput from '../../ui/select-input';
import { SelectOption } from '../../ui/select-input/select-input';
import Button from '../../ui/button';
import useIsMobile from '../../../hooks/use-is-mobile.hook';

interface Props {
  date: string | null;
  timeType: AppointmentTimeTypesEnum;
  serviceType?: number | null;
  serviceTypeOptions?: SelectOption[];
  selectedIntervals: TimeRange[];
  onDateChange: (date: string | null) => void;
  onIntervalsChange: (intervals: TimeRange[]) => void;
  onTimeTypeChange: (type: AppointmentTimeTypesEnum) => void;
  onServiceTypeChange?: (type: number) => void;
  onAddClick?: () => void;
  loading?: boolean;
}

const AppointmentDatePicker = ({
  date,
  timeType,
  serviceType,
  serviceTypeOptions,
  selectedIntervals,
  onDateChange,
  onIntervalsChange,
  onTimeTypeChange,
  onServiceTypeChange,
  onAddClick,
  loading,
}: Props) => {
  const isMobile = useIsMobile();

  return (
    <Grid container>
      <Grid item xs={12} lg={6}>
        <DateCalendar
          value={date ? dayjs(date, 'YYYY-MM-DD') : null}
          onChange={(newDate) => onDateChange(newDate?.format('YYYY-MM-DD') || null)}
          shouldDisableDate={date => date < dayjs().subtract(1, 'd')}
        />
      </Grid>
      <Divider />
      <Grid sx={!isMobile ? { borderLeft: `1px solid ${colors.secondary[30]}`, p: 3 } : {}} item xs={12} lg={6}>
        <TimePicker
          header={
            <>
              <Typography sx={{ mb: 3 }} variant="h6" fontSize={18}>
                {date ? dayjs(date, 'YYYY-MM-DD').format('dddd, MMMM D') : 'Select Date'}
              </Typography>
              {serviceTypeOptions && onServiceTypeChange && (
                <SelectInput
                  sx={{ mb: 2 }}
                  value={serviceType}
                  options={serviceTypeOptions}
                  onChange={(e) => onServiceTypeChange(parseInt(e.target.value))}
                  fullWidth
                />
              )}
            </>
          }
          type={timeType}
          selectedIntervals={selectedIntervals}
          onTypeChange={onTimeTypeChange}
          onIntervalsChange={onIntervalsChange}
        />
        {onAddClick && (
          <Box display="flex" justifyContent="end">
            <Button sx={{ mt: 2 }} variant="outlined" onClick={onAddClick} loading={loading} disabled={loading}>
              Add
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default AppointmentDatePicker;
