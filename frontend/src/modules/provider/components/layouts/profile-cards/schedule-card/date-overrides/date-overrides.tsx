import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import Button from '../../../../../../../common/ui/button';
import { colors } from '../../../../../../../config/theme/colors';
import DateOverridesModal from './date-overrides-modal';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../../services/api/provider/dto/provider.dto';
import { Schedule } from '../../../../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import dayjs from 'dayjs';
import { Trash } from '../../../../../../../common/ui/icon';

interface Props {
  title?: ReactNode;
  fullWidthButton?: boolean;
  loading?: boolean;
}

const DateOverrides = ({ title, fullWidthButton = false, loading }: Props): ReactElement | null => {
  const { values, setFieldValue } = useFormikContext<IProvider>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [scheduleOverrides, setScheduleOverrides] = useState<Schedule>({ ...values.schedule_overrides });

  useEffect(() => {
    setScheduleOverrides({ ...values.schedule_overrides });
  }, [values.schedule_overrides]);

  const handleSave = () => {
    setFieldValue('schedule_overrides', scheduleOverrides);
    setOpenModal(false);
  };

  const handleDeleteOverride = (date: string) => {
    const newOverrides: Schedule = { ...values.schedule_overrides };

    delete newOverrides[date];

    setFieldValue('schedule_overrides', newOverrides);
  };

  const handleDeleteAllOverrides = () => {
    setFieldValue('schedule_overrides', {});
  };

  const handleClose = () => {
    setScheduleOverrides({ ...values.schedule_overrides });
    setOpenModal(false);
  };

  return (
    <>
      <Grid item display="flex" justifyContent="space-between" alignItems="center" md={12}>
        {title || <Typography variant="h6">Date overrides</Typography>}
        <Button onClick={handleDeleteAllOverrides} disabled={loading}>
          Clear All
        </Button>
      </Grid>
      <Typography fontSize={14} color={colors.secondary[40]}>
        Add dates when your availability changes from your weekly hours
      </Typography>
      <Grid sx={{ mt: 2 }} item display="flex" justifyContent="center" md={12}>
        <Button variant="contained" onClick={() => setOpenModal(true)} fullWidth={fullWidthButton} disabled={loading}>
          Add a date override
        </Button>
      </Grid>
      {Object.keys(values.schedule_overrides).map((date: string, index) => {
        return (
          <>
            <Box key={date} sx={{ margin: '16px 0', display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ mt: 1 }} display="flex">
                <Typography variant="body2">{dayjs(date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</Typography>
                <Box sx={{ ml: 3 }}>
                  {values.schedule_overrides[date]?.length ? values.schedule_overrides[date].map(({ start, end }, index) => (
                    <Typography variant="body2" key={index}>
                      {dayjs(start, 'H:m:s').format('hh:mm a')} - {dayjs(end, 'H:m:s').format('hh:mm a')}
                    </Typography>
                  )) : ''}
                </Box>
              </Box>
              <IconButton onClick={() => handleDeleteOverride(date)}>
                <Trash />
              </IconButton>
            </Box>
            {index < Object.keys(values.schedule_overrides).length - 1 && <Divider />}
          </>
        );
      })}
      <DateOverridesModal
        open={openModal}
        overrides={scheduleOverrides}
        onChange={setScheduleOverrides}
        onSave={handleSave}
        onClose={handleClose}
      />
    </>
  );
};

export default DateOverrides;
