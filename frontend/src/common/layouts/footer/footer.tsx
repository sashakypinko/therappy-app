import { type ReactElement } from 'react';
import useIsMobile from '../../../hooks/use-is-mobile.hook';
import MobileFooter from './mobile-footer';
import DesktopFooter from './desktop-footer';

const Footer = (): ReactElement => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileFooter /> : <DesktopFooter />;
};

export default Footer;
