import { AdminRouteEnum } from '../routes/enums/route.enum';
import { Dashboard, Notebook, Notes, People, PeopleSync, Security } from "../../../common/ui/icon";
import { SidebarLinkInterface } from '../../../common/layouts/sidebar/interfaces/interfaces';

export const sidebarLinks: SidebarLinkInterface[] = [
  {
    label: 'Services',
    link: AdminRouteEnum.SERVICES,
    Icon: Dashboard,
  },
  {
    label: 'User Management',
    link: AdminRouteEnum.CLIENTS,
    Icon: People,
  },
  {
    label: 'Booking Management',
    link: AdminRouteEnum.BOOKINGS,
    Icon: Notes,
  },
  {
    label: 'Sp Management',
    link: AdminRouteEnum.PROVIDERS,
    Icon: PeopleSync,
  },
  {
    label: 'Sp Email Verification',
    link: AdminRouteEnum.PROVIDERS_VERIFICATION,
    Icon: Security,
  },
  {
    label: 'Landing Content',
    link: AdminRouteEnum.LANDING_CONTENT,
    Icon: Notebook,
  },
  // {
  //   label: 'Report Management',
  //   link: AdminRouteEnum.REPORTS,
  //   Icon: PeopleQueue,
  // },
];
