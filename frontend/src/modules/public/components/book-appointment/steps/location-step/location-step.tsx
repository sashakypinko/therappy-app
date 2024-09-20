import React, { ReactElement } from 'react';
import { StepProps } from '../../book-appointment';
import { Box, Grid, Typography } from '@mui/material';
import Button from '../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';
import LocationSelector from "../../../../../../common/components/appointment-widgets/location-selector";

const LocationStep = ({ appointment, setAppointment, setActiveStep, onFinish }: StepProps): ReactElement => {
  return (
    <Grid sx={{ mb: 3 }} container>
      <Grid sx={{ mt: 3 }} item display="flex" justifyContent="center" xs={12}>
        <Box textAlign="center" maxWidth={700}>
          <Typography variant="h3">Tell us where you need this therapy</Typography>
          <Typography sx={{ mt: 1 }} variant="h6">
            Select your location, so we can match you to an available therapist
          </Typography>
        </Box>
      </Grid>
      <LocationSelector appointment={appointment} setAppointment={setAppointment}/>
      <Grid sx={{ mt: 3, mb: 4 }} display="flex" justifyContent="end" item xs={12}>
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.TYPE)}>
          Back
        </Button>
        <Button sx={{ ml: 2 }} variant="contained" onClick={onFinish} disabled={!appointment.address}>
          Finish
        </Button>
      </Grid>
    </Grid>
  );
};

export default LocationStep;
