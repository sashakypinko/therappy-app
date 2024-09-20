import { UserTypesEnum } from '../enums/user-types.enum';
import { IUser } from '../services/api/user/dto/user.dto';
import { AuthStorage } from '../services/storage/auth.storage';
import { ProviderRouteEnum } from '../modules/provider/routes/enums/route.enum';
import { UserStatusesEnum } from '../enums/user-statuses.enum';
import { ClientRouteEnum } from '../modules/client/routes/enums/route.enum';
import { PublicRouteEnum } from "../modules/public/routes/enums/route.enum";
import { replaceParamsInReactUrl } from "./url.helper";

const handleAdminLogin = (user: IUser) => {
  window.location.reload();
};

const handleClientLogin = (user: IUser) => {
  if (!user.email_verified_at) {
    window.location.href = replaceParamsInReactUrl(PublicRouteEnum.EMAIL_VERIFICATION, { id: user.id, code: '' });
  } else if (user.status === UserStatusesEnum.NEW) {
    AuthStorage.updateUser({
      withoutSidebar: true,
      redirect: ClientRouteEnum.SIGN_UP_LAST_STEP,
    });
  }
  window.location.href = ClientRouteEnum.BOOKINGS;
};

const handleProviderLogin = (user: IUser) => {
  if (!user.email_verified_at) {
    window.location.href = replaceParamsInReactUrl(PublicRouteEnum.EMAIL_VERIFICATION, { id: user.id, code: '' });
  } else if (user.status === UserStatusesEnum.NEW) {
    AuthStorage.updateUser({
      withoutSidebar: true,
      redirect: ProviderRouteEnum.SIGN_UP_LAST_STEP,
    });
  } else if (user.status === UserStatusesEnum.PENDING) {
    AuthStorage.updateUser({
      withoutSidebar: true,
      redirect: ProviderRouteEnum.ACCOUNT_VERIFICATION,
    });
  } else if (user.status === UserStatusesEnum.APPROVED) {
    AuthStorage.updateUser({
      withoutSidebar: true,
      redirect: ProviderRouteEnum.SETUP_ACCOUNT,
    });
  } else if (user.status === UserStatusesEnum.DECLINED) {
    AuthStorage.updateUser({
      withoutSidebar: true,
      redirect: ProviderRouteEnum.ACCOUNT_VERIFICATION,
    });
  }
  window.location.href = ProviderRouteEnum.APPOINTMENTS;
};

export const userLoginHandler = (user: IUser) => {
  switch (user.type) {
    case UserTypesEnum.ADMIN:
      handleAdminLogin(user);
      return;
    case UserTypesEnum.CLIENT:
      handleClientLogin(user);
      return;
    case UserTypesEnum.PROVIDER:
      handleProviderLogin(user);
      return;
  }
};
