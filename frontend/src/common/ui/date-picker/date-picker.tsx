import React, { ReactElement, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { styled, SxProps } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers';

import './date-picker.css';
import { Dayjs } from 'dayjs';
import { Calendar } from '../icon-v2';

const StyledDatePicker = styled(MuiDatePicker)(
  () => `
    width: 100%;
`,
);

interface Props {
  value: Dayjs;
  onChange: (value: any) => void;
  format?: string;
  sx?: SxProps;
}

const DatePicker = (props: Props): ReactElement => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
        {...props}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        slotProps={{
          textField: {
            InputProps: {
              sx: {
                height: 40,
                borderRadius: 2,
              },
              startAdornment: <Calendar size={18} sx={{ mr: 1, mt: 0.5 }} />,
              endAdornment: null,
            },
            onClick: () => setOpen(true),
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
