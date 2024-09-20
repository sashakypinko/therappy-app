import React, { ReactElement } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StepProps } from '../../create-appointment';
import ServiceSelector from '../../../../../../../common/components/appointment-widgets/service-selector';
import { colors } from '../../../../../../../config/theme/colors';
import Button from '../../../../../../../common/ui/button';
import StepsEnum from '../../enums/steps.enum';

const ServiceStep = ({ appointment, setAppointment, setActiveStep }: StepProps): ReactElement | null => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography sx={{ mt: 1, mb: 3, color: colors.secondary[60] }}>
        Select the type of Physiotherapy you need
      </Typography>
      <ServiceSelector
        categoryId={appointment.category_id}
        serviceId={appointment.service_id}
        onServiceSelect={({ id }) => {
          setAppointment({ ...appointment, service_id: id });
          setActiveStep(StepsEnum.DATE_TIME);
        }}
      />
      <Box sx={{ mt: 8 }} display="flex" justifyContent="space-between">
        <Button variant="contained" color="inherit" onClick={() => setActiveStep(StepsEnum.CATEGORY)}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => setActiveStep(StepsEnum.DATE_TIME)}
          disabled={!appointment.service_id}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceStep;
