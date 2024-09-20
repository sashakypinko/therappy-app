import React, { ReactElement } from 'react';
import { Box, IconButton } from '@mui/material';
import SelectInput from '../../../../ui/select-input';
import { PlusSquare, Trash } from '../../../../ui/icon';
import useWorkingHours from '../../../../../hooks/use-working-hours.hook';
import dayjs from 'dayjs';

interface Props {
  times: { start: string; end: string }[];
  onTimeChange: (value: string, key: 'start' | 'end', index: number) => void;
  onTimeAdd: (addAfterIndex: number) => void;
  onTimeDelete: (index: number) => void;
  notEmpty?: boolean;
}

const SchedulerOptions = ({ times, onTimeChange, onTimeAdd, onTimeDelete, notEmpty = false }: Props): ReactElement => {
  const hours = useWorkingHours();

  return (
    <>
      {times.map(({ start, end }, index) => {
        const mainHourOptions = hours.map((hour, hourIndex) => {
          const endBeforeIndex = hours.indexOf(times[index - 1]?.end);
          const startAfterIndex = hours.indexOf(times[index + 1]?.start);
          // let disabled = hourIndex < endBeforeIndex;

          // if (!disabled && startAfterIndex >= 0) {
          //   disabled = hourIndex > startAfterIndex;
          // }

          return {
            label: dayjs(hour, 'HH:mm:ss').format('hh:mm A'),
            value: hour,
            // disabled,
          };
        });

        const selectStartHourOptions = mainHourOptions.map((option, optionIndex) => {
          const newOption = { ...option };
          const endIndex = hours.indexOf(times[index]?.end);
          // if (optionIndex > endIndex) {
          //   newOption.disabled = true;
          // }

          return newOption;
        });

        const selectEndHourOptions = mainHourOptions.map((option, optionIndex) => {
          const newOption = { ...option };
          const startIndex = hours.indexOf(times[index]?.start);
          // if (optionIndex < startIndex) {
          //   newOption.disabled = true;
          // }

          return newOption;
        });

        return (
          <Box
            key={`${index}_${start}_${end}`}
            id={`${index}`}
            sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, mt: 1 }}
          >
            <Box sx={{ display: 'flex' }}>
              <SelectInput
                sx={{ mr: 1 }}
                value={start}
                options={selectStartHourOptions}
                onChange={(e) => onTimeChange(e.target.value, 'start', index)}
              />
              <SelectInput
                value={end}
                options={selectEndHourOptions}
                onChange={(e) => onTimeChange(e.target.value, 'end', index)}
              />
              {(!notEmpty || times.length > 1) && (
                <IconButton onClick={() => onTimeDelete(index)}>
                  <Trash />
                </IconButton>
              )}
            </Box>
            <IconButton sx={{ position: 'relative', right: 0 }} onClick={() => onTimeAdd(index)}>
              <PlusSquare />
            </IconButton>
          </Box>
        );
      })}
    </>
  );
};

export default SchedulerOptions;
