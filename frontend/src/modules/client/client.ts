import routes from './routes';
import { ModuleNameEnum } from '../enums/module-name.enum';
import { ModuleInterface } from '../interfaces/interfaces';
import { ClientRouteEnum } from './routes/enums/route.enum';
import sidebarLinks from './sidebar-links';
import { UserTypesEnum } from '../../enums/user-types.enum';

export const clientModule: ModuleInterface = {
  name: ModuleNameEnum.CLIENT,
  userTypeAccess: UserTypesEnum.CLIENT,
  routes,
  defaultRedirect: ClientRouteEnum.SIGN_IN,
  rootUrl: ClientRouteEnum.ROOT,
  sidebarLinks,
};
