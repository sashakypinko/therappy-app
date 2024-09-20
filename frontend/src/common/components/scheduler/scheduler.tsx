import React, { ReactElement } from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import useWorkingHours from '../../../hooks/use-working-hours.hook';
import { colors } from '../../../config/theme/colors';
import Item from './item';
import { PlayArrowRounded } from '@mui/icons-material';
import { getColorByType, SchedulerItem } from './item/item';
import dayjs, { Dayjs } from 'dayjs';
import { ItemStatusEnum } from './enums/item-status.enum';
import useIsMobile from '../../../hooks/use-is-mobile.hook';

const StyledBox = styled(Box)(
  ({ theme }) => `
  position: relative;
  display: flex;
  align-items: center;
  padding: 34px 0;
`,
);

const compareDateWithToday = (date: Dayjs): number => {
  const today = dayjs().startOf('day');
  const inputDate = dayjs(date).startOf('day');

  if (inputDate.isBefore(today)) {
    return -1;
  } else if (inputDate.isSame(today, 'day')) {
    return 0;
  } else {
    return 1;
  }
};

export interface SchedulerItems {
  [key: string]: SchedulerItem;
}

interface Props {
  date: Dayjs | null;
  items: SchedulerItems;
}

const Scheduler = ({ items, date }: Props): ReactElement | null => {
  const hours = useWorkingHours(60);
  const nextHour = `${(new Date().getHours() + 1).toString().padStart(2, '0')}:00:00`;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Box>
        {hours.map((hour, index) => {
          const currentItemProps = items[hour.slice(0, 2)];

          if (!currentItemProps) {
            return null;
          }

          return <Item key={index} {...currentItemProps} />;
        })}
      </Box>
    );
  }

  const dateComparison = compareDateWithToday(date || dayjs());

  return (
    <Box sx={{ background: colors.background.BG_1, pl: 4, pr: 4 }}>
      {hours.map((hour, index) => {
        const isActive = dateComparison === 0 && nextHour === hour;
        const currentItemProps = items[hour.slice(0, 2)];
        const color = getColorByType(currentItemProps?.type);

        return (
          <StyledBox key={index}>
            {isActive && <PlayArrowRounded sx={{ position: 'absolute', left: '-28px' }} color="primary" />}
            <Typography
              sx={{ minWidth: 60 }}
              color={
                isActive
                  ? {
                      color: colors.primary[70],
                    }
                  : {
                      color: currentItemProps
                        ? colors[color][currentItemProps.type === ItemStatusEnum.CURRENT ? 70 : 50]
                        : colors.secondary[40],
                    }
              }
              fontWeight={isActive ? 600 : 500}
            >
              {dayjs(hour, 'HH:mm:ss').format('h a')}
            </Typography>
            <Box width="100%">
              <Divider
                sx={
                  isActive
                    ? {
                        background: colors.primary[70],
                        height: 2,
                      }
                    : {
                        background: currentItemProps
                          ? colors[color][currentItemProps.type === ItemStatusEnum.CURRENT ? 70 : 50]
                          : colors.secondary[30],
                      }
                }
              />
            </Box>
            {currentItemProps && <Item {...currentItemProps} />}
          </StyledBox>
        );
      })}
    </Box>
  );
};

export default Scheduler;
