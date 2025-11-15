import { useState } from 'react';
import { BackdropContextInterface } from '../context/backdrop.context';

const useBackdropContext = (): BackdropContextInterface => {
  const [open, setOpen] = useState<boolean>(false);

  return { open, setOpen };
};

export default useBackdropContext;
