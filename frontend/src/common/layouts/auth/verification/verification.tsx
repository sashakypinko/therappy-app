import { ReactElement, useEffect, useState } from 'react';
import { styled, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import AuthMessagePage from '../auth-message-page';
import { sendVerificationCode, verify } from '../../../../store/actions/auth';
import { colors } from '../../../../config/theme/colors';
import dayjs from 'dayjs';
import useSnackbar from '../../../../hooks/use-snackbar.hook';
import { AuthStorage } from '../../../../services/storage/auth.storage';
import { Navigate, useParams } from 'react-router-dom';
import { ClientRouteEnum } from '../../../../modules/client/routes/enums/route.enum';
import { IUser } from '../../../../services/api/user/dto/user.dto';
import { ProviderApi } from '../../../../services/api/provider';
import { UserTypesEnum } from '../../../../enums/user-types.enum';
import { ProviderRouteEnum } from "../../../../modules/provider/routes/enums/route.enum";

const Link = styled('span')(
  () => `
    color: ${colors.primary[70]};
    cursor: pointer;
`,
);

const Verification = (): ReactElement | null => {
  const { id, code } = useParams();
  const [user, setUser] = useState<IUser | null>(null);
  const [verificationFailed, setVerificationFailed] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const { successSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const fetchUser = async (id: number) => {
    try {
      const user = await ProviderApi.getById(id);
      setUser(user);
    } catch (e) {
      window.location.href = process.env.REACT_APP_BASE_URL || '';
    }
  };

  useEffect(() => {
    id && fetchUser(parseInt(id)).then();
  }, [id]);

  const handleVerify = () => {
    if (user && !user?.email_verified_at && code) {
      dispatch(
        verify(
          user.id,
          code,
          user.type === UserTypesEnum.CLIENT ? ClientRouteEnum.SIGN_UP_LAST_STEP : ProviderRouteEnum.SIGN_UP_LAST_STEP,
          () => {
            window.location.reload();
          },
          () => {
            setVerificationFailed(true);
          },
        ),
      );
    }
  };

  const handleLogout = () => {
    window.location.href = ClientRouteEnum.SIGN_UP;
  };

  const updateTimer = (timerValue: number) => {
    if (timerValue >= 0) {
      setTimer(timerValue);
      setTimeout(() => {
        updateTimer(timerValue - 1);
      }, 1000);
    }
  };

  const handleResend = () => {
    if (user) {
      dispatch(
        sendVerificationCode(user.email, () => {
          successSnackbar('Email sent');
          AuthStorage.storeLastCodeSendTime(dayjs(new Date()).unix());
          updateTimer(100);
        }),
      );
    }
  };

  useEffect(() => {
    updateTimer(100 - (dayjs(new Date()).unix() - (AuthStorage.getLastCodeSendTime() || 0)) || 0);
  }, []);

  useEffect(() => {
    handleVerify();
  }, [user]);

  if (user?.email_verified_at) {
    return <Navigate to={user.type === UserTypesEnum.CLIENT ? ClientRouteEnum.SIGN_UP_LAST_STEP : ProviderRouteEnum.SIGN_UP_LAST_STEP} />;
  }

  if (user && !code) {
    return (
      <AuthMessagePage
        title="Let's connect! Please verify your email address"
        description={
          <>
            <Typography>
              Welcome to Therappy! Please verify your email address
              <Typography color="primary" component="span">
                {` ${user?.email} `}
              </Typography>
              and complete your registration on our platform
            </Typography>
            <Typography sx={{ mt: 3 }} >
              If you don’t receive a confirmation email,
              <Typography component="span">
                {timer > 0 ? ` resend in ${timer} sec` : <Link onClick={handleResend}>{` click to resend`}</Link>}
              </Typography>
            </Typography>
            <Typography sx={{ mt: 3 }}>
              If you entered the wrong email,
              <Link onClick={handleLogout}>{' return to the Sign Up page'}</Link>
            </Typography>
          </>
        }
      />
    );
  }

  if (verificationFailed) {
    return (
      <AuthMessagePage
        title="Email verification link has expired"
        description={
          <>
            <Typography>
              If you don’t receive a confirmation email,
              <Typography component="span">
                {timer > 0 ? ` resend in ${timer} sec` : <Link onClick={handleResend}>{` click to resend`}</Link>}
              </Typography>
            </Typography>
            <Typography sx={{ mt: 3 }}>
              If you entered the wrong email,
              <Link onClick={handleLogout}>{' return to the Sign Up page'}</Link>
            </Typography>
          </>
        }
      />
    );
  }

  return null;
};

export default Verification;
