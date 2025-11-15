import routes from './routes';
import { ModuleNameEnum } from '../enums/module-name.enum';
import { ModuleInterface } from '../interfaces/interfaces';
import { PublicRouteEnum } from './routes/enums/route.enum';

export const publicModule: ModuleInterface = {
  name: ModuleNameEnum.PUBLIC,
  routes,
  withoutSidebar: true,
  rootUrl: PublicRouteEnum.ROOT,
  withHeader: false,
  withFooter: false,
};
