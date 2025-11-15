import React, { ReactElement } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import './calendar.css';
import './fix-calendar.js';
import { Box } from '@mui/material';

interface Props {
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  shouldDisableDate?: (day: Dayjs) => boolean;
}

const Calendar = ({ value, onChange, shouldDisableDate }: Props): ReactElement => {
  return (
    <Box id="customCalendar">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          sx={{
            width: '100%',
          }}
          value={value}
          onChange={onChange}
          componentsProps={{
            calendarHeader: {
              sx: {
                mt: 6,
                pb: 4,
                fontSize: 1,
                borderBottom: '1px solid #EDEDF1',
              },
              slotProps: {
                previousIconButton: { sx: { fontSize: 28 } },
                nextIconButton: { sx: { fontSize: 28 } },
                switchViewIcon: { sx: { fontSize: 24 } },
              },
            },
          }}
          shouldDisableDate={shouldDisableDate}
          dayOfWeekFormatter={(_day: string, date) => dayjs(date).format('ddd').toUpperCase()}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default Calendar;
