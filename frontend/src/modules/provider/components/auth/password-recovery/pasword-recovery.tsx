import { ReactElement } from 'react';
import CommonPasswordRecovery from '../../../../../common/layouts/auth/password-recovery';
import { ProviderRouteEnum } from '../../../routes/enums/route.enum';

const PasswordRecovery = (): ReactElement => {
  return <CommonPasswordRecovery signInLink={ProviderRouteEnum.SIGN_IN} imageSrc="/img/signup-therapist.jpg" />;
};

export default PasswordRecovery;
