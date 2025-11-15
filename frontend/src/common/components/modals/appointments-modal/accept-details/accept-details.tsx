import React, { ReactElement } from 'react';
import { Error } from '../../../../ui/icon-v2';
import { Grid, Typography } from '@mui/material';

const AcceptDetails = (): ReactElement => {
  return (
    <Grid item display="flex" xs={12} md={12}>
      <Error size={24} />
      <Typography variant="body2" fontSize={14} sx={{ ml: 2 }}>
        If you accept this appointment, a notification will be sent to the client and yourself. You have 24hrs to cancel
        without penalty. See cancellation of bookings policy and questions
      </Typography>
    </Grid>
  );
};

export default AcceptDetails;
