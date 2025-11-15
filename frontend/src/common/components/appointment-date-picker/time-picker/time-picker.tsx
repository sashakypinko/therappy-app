import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { AppointmentTimeTypeLabels, AppointmentTimeTypesEnum } from '../../../../enums/appointment-time-types.enum';
import SchedulerOptions from '../../working-time-scheduler/day-item/scheduler-options';
import React, { ReactElement, ReactNode } from 'react';
import useWorkingHours from '../../../../hooks/use-working-hours.hook';
import { TimeRange } from '../../../../services/api/appointment/dto/appointment.dto';

interface Props {
  row?: boolean;
  type: AppointmentTimeTypesEnum | undefined;
  selectedIntervals: TimeRange[];
  onIntervalsChange: (intervals: TimeRange[]) => void;
  onTypeChange: (type: AppointmentTimeTypesEnum) => void;
  header?: ReactNode | string;
}

const TimePicker = ({
  row = false,
  type,
  selectedIntervals,
  onIntervalsChange,
  onTypeChange,
  header,
}: Props): ReactElement => {
  const hours = useWorkingHours();

  const handleChange = (newValue: string, key: 'start' | 'end', index: number) => {
    const newIntervals: TimeRange[] = [...selectedIntervals];

    newIntervals[index][key] = newValue;

    onIntervalsChange(newIntervals);
  };

  const handleAdd = (index: number) => {
    const prevTimeEnd = selectedIntervals[index]?.end || hours[0];

    onIntervalsChange([
      ...selectedIntervals.slice(0, index + 1),
      {
        start: prevTimeEnd,
        end: prevTimeEnd,
      },
      ...selectedIntervals.slice(index + 1),
    ]);
  };

  const handleDelete = (index: number) => {
    onIntervalsChange([...selectedIntervals.slice(0, index), ...selectedIntervals.slice(index + 1)]);
  };

  return (
    <Box>
      {header}
      <Box display={row ? 'flex' : 'block'}>
        <RadioGroup value={type} onChange={(e, value) => onTypeChange(parseInt(value))}>
          {Object.entries(AppointmentTimeTypeLabels).slice(0, 2).map(([value, label]) => (
            <FormControlLabel
              key={value}
              checked={parseInt(value) === type}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
        <RadioGroup value={type} onChange={(e, value) => onTypeChange(parseInt(value))}>
          {Object.entries(AppointmentTimeTypeLabels).slice(2, 4).map(([value, label]) => (
            <FormControlLabel
              key={value}
              checked={parseInt(value) === type}
              value={value}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </Box>
      <SchedulerOptions
        times={selectedIntervals}
        onTimeChange={handleChange}
        onTimeAdd={handleAdd}
        onTimeDelete={handleDelete}
        notEmpty
      />
    </Box>
  );
};

export default TimePicker;
