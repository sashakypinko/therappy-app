import React, { ReactElement, SyntheticEvent } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import { DayLabelsLong, DaysEnum } from '../../../../enums/days.enum';
import Switch from '../../../ui/switch';
import { Schedule } from './types/schedule.type';
import { colors } from '../../../../config/theme/colors';
import useWorkingHours from '../../../../hooks/use-working-hours.hook';
import CardSection from '../../../../modules/provider/components/layouts/profile-cards/card-section';
import SchedulerOptions from './scheduler-options';

const DayContainer = styled(Grid)(
  () => `
  display: flex;
`,
);

interface Props {
  day: DaysEnum;
  value: Schedule;
  onChange: (schedule: Schedule) => void;
}

const DayItem = ({ day, value, onChange }: Props): ReactElement => {
  const hours = useWorkingHours();
  const handleSwitchDay = (e: SyntheticEvent<Element, Event>, checked: boolean) => {
    let newSchedule: Schedule = { ...value };

    if (!checked) {
      delete newSchedule[day];
    } else {
      newSchedule = {
        ...newSchedule,
        [day]: [
          {
            start: hours[0],
            end: hours[hours.length - 1],
          },
        ],
      };
    }

    onChange(newSchedule);
  };

  const handleChangeHours = (newValue: string, key: 'start' | 'end', hoursIndex: number) => {
    const newSchedule: Schedule = { ...value };

    newSchedule[day][hoursIndex][key] = newValue;

    onChange(newSchedule);
  };

  const handleAddHours = (index: number) => {
    const newSchedule: Schedule = { ...value };
    const prevHourEnd = newSchedule[day][index].end;

    newSchedule[day] = [
      ...newSchedule[day].slice(0, index + 1),
      {
        start: prevHourEnd,
        end: prevHourEnd,
      },
      ...newSchedule[day].slice(index + 1),
    ];
    onChange(newSchedule);
  };

  const handleDeleteHours = (index: number) => {
    const newSchedule: Schedule = { ...value };

    if (newSchedule[day].length > 1) {
      newSchedule[day] = [...newSchedule[day].slice(0, index), ...newSchedule[day].slice(index + 1)];
    } else {
      delete newSchedule[day];
    }

    onChange(newSchedule);
  };

  return (
    <CardSection sx={{ mb: 0 }} withTopBorder>
      <DayContainer container>
        <Grid item xs={12} md={4} lg={3}>
          <Switch label={DayLabelsLong[day]} checked={!!value[day]} onChange={handleSwitchDay} />
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {value[day]?.length ? (
            <SchedulerOptions
              times={value[day]}
              onTimeChange={handleChangeHours}
              onTimeAdd={handleAddHours}
              onTimeDelete={handleDeleteHours}
            />
          ) : (
            <Typography sx={{ pt: 1, color: colors.secondary[50] }}>Unavailable</Typography>
          )}
        </Grid>
      </DayContainer>
    </CardSection>
  );
};

export default DayItem;
