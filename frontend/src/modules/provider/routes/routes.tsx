import React, { lazy } from "react";
import { Navigate } from 'react-router-dom';
import { RouteInterface } from '../../../routes/interfaces/route.interface';
import { ProviderRouteEnum } from './enums/route.enum';

const SignIn = lazy(() => import('../components/auth/sign-in'));
const SignUp = lazy(() => import('../components/auth/sign-up'));
const Appointments = lazy(() => import('../components/pages/appointments'));
const PasswordRecovery = lazy(() => import('../components/auth/password-recovery'));
const SignUpLastStep = lazy(() => import('../components/auth/sign-up-last-step'));
const AccountVerification = lazy(() => import('../components/auth/account-verification'));
const SetupAccount = lazy(() => import('../components/auth/setup-account'));
const Calendar = lazy(() => import('../components/pages/calendar'));
const Profile = lazy(() => import('../components/pages/profile'));
const Blocked = lazy(() => import('../components/pages/blocked'));

export const routes: RouteInterface[] = [
  {
    path: ProviderRouteEnum.ROOT,
    Component: () => <Navigate to={ProviderRouteEnum.APPOINTMENTS} />,
  },
  {
    path: ProviderRouteEnum.SIGN_IN,
    Component: SignIn,
    notAuthOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.SIGN_UP,
    Component: SignUp,
    notAuthOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.SIGN_UP_LAST_STEP,
    Component: SignUpLastStep,
    authOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.PASSWORD_RECOVERY,
    Component: PasswordRecovery,
    notAuthOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.ACCOUNT_VERIFICATION,
    Component: AccountVerification,
    authOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.SETUP_ACCOUNT,
    Component: SetupAccount,
    authOnly: true,
    redirectTo: ProviderRouteEnum.APPOINTMENTS,
  },
  {
    path: ProviderRouteEnum.APPOINTMENTS,
    Component: Appointments,
    authOnly: true,
    redirectTo: ProviderRouteEnum.SIGN_IN,
  },
  {
    path: ProviderRouteEnum.CALENDAR,
    Component: Calendar,
    authOnly: true,
    redirectTo: ProviderRouteEnum.SIGN_IN,
  },
  {
    path: ProviderRouteEnum.PROFILE,
    Component: Profile,
    authOnly: true,
    redirectTo: ProviderRouteEnum.SIGN_IN,
  },
  {
    path: ProviderRouteEnum.BLOCKED,
    Component: Blocked,
    authOnly: true,
    redirectTo: ProviderRouteEnum.SIGN_IN,
  },
];
