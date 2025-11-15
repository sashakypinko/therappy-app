import React, { ReactElement } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Card from '../card';
import WorkingTimeScheduler from '../../../../../../common/components/working-time-scheduler';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import { Schedule as ScheduleType } from '../../../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import Button from '../../../../../../common/ui/button';
import DateOverrides from '../../../../../provider/components/layouts/profile-cards/schedule-card/date-overrides';
import { colors } from '../../../../../../config/theme/colors';

const Schedule = ({ loading }: { loading: boolean }): ReactElement => {
  const { values, setFieldValue, isSubmitting } = useFormikContext<IProvider>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Card title="Working Time">
          <Box sx={{ mt: 3 }} display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="subtitle1">Schedule</Typography>
            <Button onClick={() => setFieldValue('schedule', [])} disabled={loading}>
              Clear all
            </Button>
          </Box>
          <WorkingTimeScheduler
            value={values.schedule}
            onChange={(schedule: ScheduleType) => setFieldValue('schedule', schedule)}
            loading={loading}
          />
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <DateOverrides
            title={
              <Typography variant="subtitle1" color={colors.primary[60]}>
                Date overrides
              </Typography>
            }
            loading={loading}
            fullWidthButton
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Schedule;
