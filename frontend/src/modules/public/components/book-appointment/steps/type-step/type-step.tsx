import React, { ReactElement } from 'react';
import { StepProps } from '../../book-appointment';
import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';
import TypeSelector from '../../../../../../common/components/appointment-widgets/type-selector';

const TypeStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement => {
  const handleSelectType = (type: number, price: number) => {
    setAppointment({ ...appointment, type, price });
  };

  return (
    <Grid sx={{ mb: 3 }} container spacing={3}>
      <Grid sx={{ mb: 3 }} item display="flex" justifyContent="center" xs={12}>
        <Box textAlign="center" maxWidth={700}>
          <Typography variant="h3">Select an appointment</Typography>
          <Typography sx={{ mt: 1 }} variant="h6">
            If this is your first time, lock it in as an initial appointment. If you loved having a therapist come to
            you then book in a follow up.
          </Typography>
        </Box>
      </Grid>
      <TypeSelector type={appointment.type} categoryId={appointment.category_id} onTypeSelect={handleSelectType} />
      <Grid sx={{ mt: 1, mb: 4 }} display="flex" justifyContent="end" item xs={12}>
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.DATE_TIME)}>
          Back
        </Button>
        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.LOCATION)}
          disabled={!appointment.type}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default TypeStep;
