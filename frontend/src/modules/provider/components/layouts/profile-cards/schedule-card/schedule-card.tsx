import React, { ReactElement } from 'react';
import Card from '../card';
import { Grid, styled, Typography } from '@mui/material';
import { colors } from '../../../../../../config/theme/colors';
import { useFormikContext } from 'formik';
import { IProvider } from '../../../../../../services/api/provider/dto/provider.dto';
import WorkingTimeScheduler from '../../../../../../common/components/working-time-scheduler';
import { Schedule } from '../../../../../../common/components/working-time-scheduler/day-item/types/schedule.type';
import DateOverrides from './date-overrides';
import CardSection from '../card-section';

const FieldDescription = styled(Typography)(
  () => `
    color: ${colors.secondary[50]};
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 12px;
`,
);

interface Props {
  withDateOverrides?: boolean;
  loading?: boolean;
}

const ScheduleCard = ({ withDateOverrides = false, loading }: Props): ReactElement => {
  const { values, setFieldValue } = useFormikContext<IProvider>();

  return (
    <Card title="Schedule" buttonLabel="Clear All" onClick={() => setFieldValue('schedule', [])} disabled={loading}>
      <Grid item md={12}>
        <FieldDescription sx={{ ml: 4 }}>Select your working hours</FieldDescription>
        <WorkingTimeScheduler
          value={values.schedule}
          onChange={(schedule: Schedule) => setFieldValue('schedule', schedule)}
          loading={loading}
        />
      </Grid>
      {withDateOverrides && (
        <CardSection withTopBorder>
          <DateOverrides loading={loading} />
        </CardSection>
      )}
      {/* <CardSection withTopBorder> */}
      {/*   <Grid display="flex" justifyContent="space-between" alignItems="center" item md={12}> */}
      {/*     <Typography variant="h6">Allow all notifications</Typography> */}
      {/*     <Switch sx={{ mr: 0 }} checked onChange={console.log} /> */}
      {/*   </Grid> */}
      {/*   <Grid sx={{ mt: 1 }} item md={12}> */}
      {/*     <Alert icon={<ErrorWarning size={24} />} variant="warning"> */}
      {/*       Allow notifications to receive all the most important notifications */}
      {/*     </Alert> */}
      {/*   </Grid> */}
      {/* </CardSection> */}
      <CardSection>
        <></>
      </CardSection>
    </Card>
  );
};

export default ScheduleCard;
