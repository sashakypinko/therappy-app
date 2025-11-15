import React, { ReactElement, useMemo, useState } from 'react';
import Modal from '../../../../../../../../common/ui/modal';
import { Badge, Divider, Grid, styled, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../../../../../../../../common/ui/button';
import { Schedule } from '../../../../../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import SchedulerOptions from '../../../../../../../../common/components/working-time-scheduler/day-item/scheduler-options';
import useWorkingHours from '../../../../../../../../hooks/use-working-hours.hook';
import { colors } from '../../../../../../../../config/theme/colors';

const Dot = styled('div')(
  () => `
  position: absolute;
  bottom: 3px;
  left: 43%;
  background: ${colors.primary[70]};
  width: 6px;
  height: 6px;
  border-radius: 7px;
`,
);

const OverrideDay = (props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }) => {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;
  const isSelected = !props.outsideCurrentMonth && highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      // badgeContent={isSelected ? <Dot /> : undefined}
    >
      {isSelected && <Dot />}
      <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
    </Badge>
  );
};

interface Props {
  open: boolean;
  overrides: Schedule;
  onSave: () => void;
  onChange: (newOverrides: Schedule) => void;
  onClose: () => void;
}

const DateOverridesModal = ({ open, overrides, onSave, onChange, onClose }: Props): ReactElement => {
  const now = dayjs(new Date());
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(now);
  const [activeMonth, setActiveMonth] = useState<number>(now.month());
  const [activeYear, setActiveYear] = useState<number>(now.year());
  const parsedDate = useMemo(() => dayjs(selectedDate).format('YYYY-MM-DD'), [selectedDate]);
  const hours = useWorkingHours();

  const handleChange = (newValue: string, key: 'start' | 'end', index: number) => {
    if (parsedDate) {
      const newOverrides: Schedule = { ...overrides };

      newOverrides[parsedDate][index][key] = newValue;

      onChange(newOverrides);
    }
  };

  const handleAdd = (index: number) => {
    if (parsedDate) {
      const newOverrides: Schedule = { ...overrides };
      if (!newOverrides[parsedDate]) {
        newOverrides[parsedDate] = [];
      }

      const prevTimeEnd = newOverrides[parsedDate][index]?.end || hours[0];

      newOverrides[parsedDate] = [
        ...newOverrides[parsedDate].slice(0, index + 1),
        {
          start: prevTimeEnd,
          end: prevTimeEnd,
        },
        ...newOverrides[parsedDate].slice(index + 1),
      ];
      onChange(newOverrides);
    }
  };

  const handleDelete = (index: number) => {
    const newOverrides: Schedule = { ...overrides };

    newOverrides[parsedDate] = [
      ...newOverrides[parsedDate].slice(0, index),
      ...newOverrides[parsedDate].slice(index + 1),
    ];

    if (!newOverrides[parsedDate].length) {
      delete newOverrides[parsedDate];
    }

    onChange(newOverrides);
  };

  const times = useMemo(() => overrides[parsedDate] || [], [parsedDate, overrides]);
  const highlightedDays = Object.keys(overrides).map((date) => {
    if (!overrides[date].length) return undefined;
    if (!(dayjs(date).month() === activeMonth && dayjs(date).year() === activeYear)) {
      return undefined;
    }
    return parseInt(dayjs(date).format('D'));
  });

  return (
    <Modal maxWidth="xs" open={open} onClose={onClose}>
      <Grid container>
        <Grid item textAlign="center" xs={12}>
          <Typography variant="h5">Select the date(s) you want to assign specific hours</Typography>
        </Grid>
        <Grid sx={{ mt: 2 }} item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{ width: 360 }}
              value={selectedDate}
              onChange={(value) => {
                setSelectedDate(value);
              }}
              onMonthChange={(value) => {
                setActiveMonth(value.month());
                setActiveYear(value.year());
              }}
              onYearChange={(value) => {
                setActiveMonth(value.month());
                setActiveYear(value.year());
              }}
              slots={{
                day: OverrideDay,
              }}
              slotProps={{
                day: { highlightedDays } as any,
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item textAlign="center" xs={12}>
          <Typography sx={{ mb: 3 }}>What hours are you available?</Typography>
          {times.length ? (
            <SchedulerOptions
              times={times}
              onTimeChange={handleChange}
              onTimeAdd={handleAdd}
              onTimeDelete={handleDelete}
            />
          ) : (
            <Button onClick={() => handleAdd(0)}>Add override for this date</Button>
          )}
        </Grid>
        <Grid sx={{ mt: 2 }} item xs={12}>
          <Divider />
        </Grid>
        <Grid sx={{ mt: 2 }} item display="flex" justifyContent="space-between" xs={12}>
          <Button variant="contained" color="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave}>
            Apply
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default DateOverridesModal;
