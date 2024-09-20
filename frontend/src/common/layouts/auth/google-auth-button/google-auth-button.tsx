import { ReactElement, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { styled } from '@mui/material';
import Button from '../../../ui/button';
import { colors } from '../../../../config/theme/colors';
import { AuthApi } from '../../../../services/api/auth';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { AuthStorage } from '../../../../services/storage/auth.storage';
import { userLoginHandler } from '../../../../helpers/auth.helper';
import { IUser } from "../../../../services/api/user/dto/user.dto";

const GoogleButton = styled(Button)(
  () => `
    width: 154px;
    height: 50px;
    border: 1px solid ${colors.secondary[20]};
`,
);

const GoogleImage = styled('img')(
  () => `
    width: 28px;
    height: 28px;
`,
);

interface Props {
  userType: UserTypesEnum;
  disabled: boolean;
  onLogin?: (user: IUser) => void;
}

const GoogleAuthButton = ({ userType, disabled, onLogin }: Props): ReactElement => {
  const [loading, setLoading] = useState<boolean>(false);
  const { errorSnackbar } = useSnackbar();

  const handleLogin = async (token: string) => {
    setLoading(true);
    try {
      const res = await AuthApi.googleSignIn({
        type: userType,
        token,
      });

      if (res.auth) {
        AuthStorage.storeUser(res.auth);
        AuthStorage.storeToken(res.token);
        onLogin ? onLogin(res.auth) : userLoginHandler(res.auth);
      } else {
        errorSnackbar("Something went wrong. Can't login.");
      }
    } catch (e) {
      errorSnackbar("Something went wrong. Can't login.");
    } finally {
      setLoading(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleLogin(tokenResponse.access_token),
    onError: () => errorSnackbar("Something went wrong. Can't login."),
  });

  return (
    <GoogleButton sx={{ mt: 3 }} onClick={() => login()} disabled={loading || disabled} loading={loading}>
      <GoogleImage src="/img/google.png" />
    </GoogleButton>
  );
};

export default GoogleAuthButton;
