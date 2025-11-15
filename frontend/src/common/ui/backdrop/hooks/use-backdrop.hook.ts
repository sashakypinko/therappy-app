import { useContext, useState } from 'react';
import { BackdropContext, BackdropContextInterface } from '../context/backdrop.context';

const useBackdrop = () => {
  const { setOpen } = useContext(BackdropContext);

  return {
    startLoading: () => setOpen(true),
    endLoading: () => setOpen(false),
  };
};

export default useBackdrop;
