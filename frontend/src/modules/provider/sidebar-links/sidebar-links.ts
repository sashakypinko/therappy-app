import { SidebarLinkInterface } from '../../../common/layouts/sidebar/interfaces/interfaces';
import { Dashboard } from '../../../common/ui/icon';
import { ProviderRouteEnum } from '../routes/enums/route.enum';
import Calendar from '../../../common/ui/icon/calendar';
import Profile from '../../../common/ui/icon/profile';
import BlockUser from '../../../common/ui/icon/block-user';

export const sidebarLinks: SidebarLinkInterface[] = [
  {
    label: 'Appointments',
    link: ProviderRouteEnum.APPOINTMENTS,
    Icon: Dashboard,
  },
  {
    label: 'Calendar',
    link: ProviderRouteEnum.CALENDAR,
    Icon: Calendar,
  },
  {
    label: 'Profile',
    link: ProviderRouteEnum.PROFILE,
    Icon: Profile,
  },
  {
    label: 'Blocked',
    link: ProviderRouteEnum.BLOCKED,
    Icon: BlockUser,
  },
];
