import React, { ReactElement } from 'react';
import { DayLabelsShort } from '../../../enums/days.enum';
import DayItem from './day-item';
import { Schedule } from './day-item/types/schedule.type';
import { Box, Skeleton } from '@mui/material';

interface Props {
  value: Schedule;
  onChange: (schedule: Schedule) => void;
  loading?: boolean;
}

const WorkingTimeScheduler = ({ value, onChange, loading }: Props): ReactElement => {
  return (
    <Box position="relative">
      {Object.keys(DayLabelsShort).map((day, index) =>
        loading ? (
          <Skeleton key={index} sx={{ borderRadius: '8px', mt: 3 }} variant="rectangular" width="100%" height={61} />
        ) : (
          <DayItem key={index} value={value} day={parseInt(day)} onChange={onChange} />
        ),
      )}
    </Box>
  );
};

export default WorkingTimeScheduler;
