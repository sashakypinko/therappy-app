import { ReactElement, useEffect, useState } from "react";
import { MobileSidebar } from '../sidebar';
import Button from '../../ui/button';
import { ClientRouteEnum } from '../../../modules/client/routes/enums/route.enum';
import SidebarContent from "./sidebar-content";

const MobileHeader = (): ReactElement => {
  const [activeLink, setActiveLink] = useState<string>('');

  return (
    <MobileSidebar
      sidebarContent={<SidebarContent activeLink={activeLink} setActiveLink={setActiveLink} />}
      headerAction={
        <Button color="inherit" onClick={() => (window.location.href = ClientRouteEnum.SIGN_UP)}>
          Sign Up
        </Button>
      }
    />
  );
};

export default MobileHeader;
