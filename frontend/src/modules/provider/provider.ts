import routes from './routes';
import { ModuleNameEnum } from '../enums/module-name.enum';
import { ModuleInterface } from '../interfaces/interfaces';
import { ProviderRouteEnum } from './routes/enums/route.enum';
import sidebarLinks from './sidebar-links';
import { UserTypesEnum } from '../../enums/user-types.enum';

export const providerModule: ModuleInterface = {
  name: ModuleNameEnum.PROVIDER,
  userTypeAccess: UserTypesEnum.PROVIDER,
  routes,
  defaultRedirect: ProviderRouteEnum.SIGN_IN,
  rootUrl: ProviderRouteEnum.ROOT,
  sidebarLinks,
};
