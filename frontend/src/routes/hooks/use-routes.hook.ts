import { RoutesProps } from '../routes';
import { ModuleNameEnum } from '../../modules/enums/module-name.enum';
import modules from '../../modules';

const getCurrentModuleName = (): ModuleNameEnum => {
  const currentURL = window.location.href;
  const domain = window.location.origin;
  const urlWithoutDomain = currentURL.replace(domain, '');

  if (!urlWithoutDomain.length) {
    return ModuleNameEnum.PUBLIC;
  }
  const moduleName = urlWithoutDomain.split('/')[1];

  switch (moduleName) {
    case ModuleNameEnum.ADMIN:
      return ModuleNameEnum.ADMIN;
    case ModuleNameEnum.CLIENT:
      return ModuleNameEnum.CLIENT;
    case ModuleNameEnum.PROVIDER:
      return ModuleNameEnum.PROVIDER;

    default:
      return ModuleNameEnum.PUBLIC;
  }
};

const getRoutesByModuleName = (moduleName: ModuleNameEnum): RoutesProps => {
  return {
    routes: modules[moduleName].routes,
    defaultRedirect: modules[moduleName].defaultRedirect,
    withoutSidebar: !!modules[moduleName].withoutSidebar,
    userTypeAccess: modules[moduleName].userTypeAccess,
    withHeader: !!modules[moduleName]?.withHeader,
    withFooter: !!modules[moduleName]?.withFooter,
  };
};

const useRoutes = (): RoutesProps => {
  const moduleName: ModuleNameEnum = getCurrentModuleName();

  return getRoutesByModuleName(moduleName);
};

export default useRoutes;
