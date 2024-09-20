import { ReactElement } from 'react';
import CommonPasswordRecovery from '../../../../../common/layouts/auth/password-recovery';
import { ClientRouteEnum } from '../../../routes/enums/route.enum';

const PasswordRecovery = (): ReactElement => {
  return <CommonPasswordRecovery signInLink={ClientRouteEnum.SIGN_IN} imageSrc="/img/signup-client.jpg" />;
};

export default PasswordRecovery;
