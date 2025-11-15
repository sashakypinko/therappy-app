import routes from './routes';
import sidebarLinks from './sidebar-links';
import { ModuleNameEnum } from '../enums/module-name.enum';
import { ModuleInterface } from '../interfaces/interfaces';
import { AdminRouteEnum } from './routes/enums/route.enum';
import { UserTypesEnum } from '../../enums/user-types.enum';

export const adminModule: ModuleInterface = {
  name: ModuleNameEnum.ADMIN,
  userTypeAccess: UserTypesEnum.ADMIN,
  routes,
  defaultRedirect: AdminRouteEnum.SIGN_IN,
  rootUrl: AdminRouteEnum.ROOT,
  sidebarLinks,
};
