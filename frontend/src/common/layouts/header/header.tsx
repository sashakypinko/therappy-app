import { ReactElement } from 'react';
import useIsMobile from '../../../hooks/use-is-mobile.hook';
import MobileHeader from './mobile-header';
import DesktopHeader from './desktop-header';

const Header = (): ReactElement => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
