import { ModuleNameEnum } from '../enums/module-name.enum';
import { RouteInterface } from '../../routes/interfaces/route.interface';
import { SidebarLinkInterface } from '../../common/layouts/sidebar/interfaces/interfaces';
import { UserTypesEnum } from '../../enums/user-types.enum';

export interface ModuleInterface {
  name: ModuleNameEnum;
  userTypeAccess?: UserTypesEnum;
  routes: RouteInterface[];
  defaultRedirect?: any;
  rootUrl: string;
  sidebarLinks?: SidebarLinkInterface[];
  withoutSidebar?: boolean;
  withHeader?: boolean;
  withFooter?: boolean;
}
