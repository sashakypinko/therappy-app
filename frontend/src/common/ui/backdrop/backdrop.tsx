import React, { ReactElement, useContext } from 'react';
import { Backdrop as MuiBackdrop, CircularProgress } from '@mui/material';
import { BackdropContext } from './context/backdrop.context';

const Backdrop = (): ReactElement => {
  const { open } = useContext(BackdropContext);

  return (
    <MuiBackdrop sx={{ color: '#fff', zIndex: 99999 }} open={open}>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
