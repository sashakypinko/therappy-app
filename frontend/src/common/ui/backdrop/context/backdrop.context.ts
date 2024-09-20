import { createContext } from 'react';

export interface BackdropContextInterface {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const BackdropContext = createContext<BackdropContextInterface>({
  open: false,
  /* eslint-disable @typescript-eslint/no-empty-function */
  setOpen: () => {},
});
