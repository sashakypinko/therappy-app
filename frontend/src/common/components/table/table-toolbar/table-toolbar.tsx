import React, { MouseEvent, type ReactElement, useState } from 'react';
import { Box, IconButton, Popover, styled, Typography } from '@mui/material';
import Button from '../../../ui/button';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
import { colors } from '../../../../config/theme/colors';
import { CalendarSquare, Download } from '../../../ui/icon-v2';
import dayjs, { Dayjs } from 'dayjs';
import DateCalendar from '../../../ui/calendar';

const ChangeDateButton = styled(Button)(
  () => `
    border: 1px solid ${colors.secondary[30]};
    color: ${colors.secondary[70]};
    background: ${colors.background.BG_1};
    border-radius: 4px;
    padding: 0;
`,
);

const ActionGroup = styled(Box)(
  () => `
    border-radius: 4px;
    border: 1px solid #DCDFE3;
    background: ${colors.background.BG_3};
`,
);

const ActionButton = styled(Button)(
  () => `
  padding: 0;
  border-radius: 0;
  border-left: 1px solid #DCDFE3;
`,
);

const getRelativeDateDescription = (targetDate: Dayjs): string => {
  const currentDate = dayjs();
  const targetDay = dayjs(targetDate);

  if (targetDay.isSame(currentDate, 'day')) {
    return 'Today';
  }
  if (targetDay.isSame(currentDate.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  if (targetDay.isSame(currentDate.add(1, 'day'), 'day')) {
    return 'Tomorrow';
  }

  return '';
};

interface Props {
  date?: Dayjs | null;
  onDateChange?: (date: Dayjs | null) => void;
}

const TableToolbar = ({ date, onDateChange }: Props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleOpenCalendar = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCalendar = () => {
    setAnchorEl(null);
  };

  const openCalendar = Boolean(anchorEl);

  return (
    <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
      {onDateChange && date !== undefined ? (
        <Box display="flex" alignItems="center" justifyContent="space-between" minWidth={410}>
          <ChangeDateButton
            sx={{ mr: 2 }}
            variant="outlined"
            color="secondary"
            onClick={() => onDateChange((date || dayjs()).add(-1, 'day'))}
          >
            <KeyboardArrowLeftRounded />
          </ChangeDateButton>
          <Box display="flex" alignItems="center">
            <Typography variant="subtitle1" fontSize={14}>
              {date ? date.format('MMMM D, YYYY') : 'All time'}
            </Typography>
            <Typography sx={{ ml: 1 }} fontSize={14}>
              {date && getRelativeDateDescription(date)}
            </Typography>
            {openCalendar ? (
              <IconButton onClick={handleCloseCalendar}>
                <KeyboardArrowUpRounded />
              </IconButton>
            ) : (
              <IconButton onClick={handleOpenCalendar}>
                <KeyboardArrowDownRounded />
              </IconButton>
            )}
          </Box>
          <ChangeDateButton
            sx={{ ml: 2 }}
            variant="outlined"
            color="secondary"
            onClick={() => onDateChange((date || dayjs()).add(1, 'day'))}
          >
            <KeyboardArrowRightRounded />
          </ChangeDateButton>
          <Popover
            open={openCalendar}
            anchorEl={anchorEl}
            onClose={handleCloseCalendar}
            elevation={1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <DateCalendar value={date} onChange={onDateChange} />
          </Popover>
        </Box>
      ) : (
        <Box />
      )}
      <Box display="flex">
        {onDateChange && (
          <Button sx={{ fontWeight: 500 }} onClick={() => onDateChange(null)}>
            Clear date
          </Button>
        )}
        <ActionGroup>
          <ActionButton sx={{ borderLeft: 'none' }} color="inherit">
            <CalendarSquare />
          </ActionButton>
          <ActionButton color="inherit">
            <Download />
          </ActionButton>
        </ActionGroup>
      </Box>
    </Box>
  );
};

export default TableToolbar;
