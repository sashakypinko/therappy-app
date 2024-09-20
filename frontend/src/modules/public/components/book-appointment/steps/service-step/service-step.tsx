import { ReactElement } from 'react';
import { StepProps } from '../../book-appointment';
import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';
import ServiceSelector from '../../../../../../common/components/appointment-widgets/service-selector';

const ServiceStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement | null => {
  return (
    <Grid container spacing={3}>
      <Grid item display="flex" justifyContent="center" xs={12}>
        <Box textAlign="center" maxWidth={700}>
          <Typography variant="h3">What type of physiotherapy do you need?</Typography>
          <Typography sx={{ mt: 1 }} variant="h6">
            Select the type of Physiotherapy you need
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <ServiceSelector
          categoryId={appointment.category_id}
          serviceId={appointment.service_id}
          onServiceSelect={({ id }) => {
            setAppointment({ ...appointment, service_id: id });
            setActiveStep(StepsEnum.DATE_TIME);
          }}
        />
      </Grid>
      <Grid sx={{ mt: 1, mb: 4 }} display="flex" justifyContent="end" item xs={12}>
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.CATEGORY)}>
          Back
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.DATE_TIME)}
          disabled={!appointment.service_id}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default ServiceStep;
