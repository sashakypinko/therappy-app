import { createContext } from 'react';
import { SidebarLinkInterface } from '../interfaces/interfaces';

export interface SidebarContextInterface {
  links: SidebarLinkInterface[];
  opened: boolean;
  toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextInterface>({
  links: [],
  opened: false,
  /* eslint-disable @typescript-eslint/no-empty-function */
  toggle: () => {},
});
