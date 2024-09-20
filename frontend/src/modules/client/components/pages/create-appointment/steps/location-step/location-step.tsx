import React, { ReactElement } from 'react';
import { Box, Typography } from '@mui/material';
import { StepProps } from '../../create-appointment';
import { colors } from '../../../../../../../config/theme/colors';
import Button from '../../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';
import LocationSelector from "../../../../../../../common/components/appointment-widgets/location-selector";

const LocationStep = ({ appointment, setAppointment, setActiveStep, onFinish, loading }: StepProps): ReactElement => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        To make an appointment, select your location
      </Typography>
      <LocationSelector appointment={appointment} setAppointment={setAppointment}/>
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.DATE_TIME)}>
          Back
        </Button>
        <Button variant="contained" onClick={onFinish} loading={loading} disabled={!appointment.type || loading}>
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default LocationStep;
