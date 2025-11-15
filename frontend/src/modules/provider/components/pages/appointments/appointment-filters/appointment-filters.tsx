import React, { ReactElement } from 'react';
import DateCalendar from '../../../../../../common/ui/calendar';
import { Dayjs } from 'dayjs';
import { Box, Divider } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import useIsMobile from '../../../../../../hooks/use-is-mobile.hook';

interface Props {
  date: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
  dateRequired?: boolean;
}

const AppointmentFilters = ({ date, onChange, dateRequired = false }: Props): ReactElement => {
  const isMobile = useIsMobile();

  return (
    <Box sx={{ p: 2 }} maxWidth={isMobile ? '100%' : 460}>
      <DateCalendar value={date} onChange={onChange} />
      {
        !dateRequired && (
          <Button variant="outlined" onClick={() => onChange(null)} fullWidth>
            Clear Date
          </Button>
        )
      }
    </Box>
  );
};

export default AppointmentFilters;
