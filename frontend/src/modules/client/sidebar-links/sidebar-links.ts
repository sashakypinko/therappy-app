import { SidebarLinkInterface } from '../../../common/layouts/sidebar/interfaces/interfaces';
import { ReloadCircle, TaskSearch } from '../../../common/ui/icon';
import { ClientRouteEnum } from '../routes/enums/route.enum';
import CalendarDots from '../../../common/ui/icon/calendar-dots';
import Quiz from '../../../common/ui/icon/quiz';
import { BookingsTabs } from '../components/pages/bookings/bookings';

export const sidebarLinks: SidebarLinkInterface[] = [
  {
    label: 'My Bookings',
    link: ClientRouteEnum.BOOKINGS,
    Icon: CalendarDots,
  },
  {
    label: 'New Service',
    link: ClientRouteEnum.CREATE_APPOINTMENT,
    Icon: TaskSearch,
  },
  {
    label: 'Rebook',
    link: `${ClientRouteEnum.REBOOK}?tab=${BookingsTabs.PAST}`,
    Icon: ReloadCircle,
  },
  {
    label: 'Help',
    link: ClientRouteEnum.HELP,
    Icon: Quiz,
  },
];
