import React, { lazy } from "react";
import { Navigate } from 'react-router-dom';
import { RouteInterface } from '../../../routes/interfaces/route.interface';
import { ClientRouteEnum } from './enums/route.enum';

const SignIn = lazy(() => import('../components/auth/sign-in'));
const SignUp = lazy(() => import('../components/auth/sign-up'));
const SignUpLastStep = lazy(() => import('../components/auth/sign-up-last-step'));
const PasswordRecovery = lazy(() => import('../components/auth/password-recovery'));
const Bookings = lazy(() => import('../components/pages/bookings'));
const Help = lazy(() => import('../components/pages/help'));
const RebookAppointment = lazy(() => import('../components/pages/rebook-appointment'));
const CreateAppointment = lazy(() => import('../components/pages/create-appointment'));

export const routes: RouteInterface[] = [
  {
    path: ClientRouteEnum.ROOT,
    Component: () => <Navigate to={ClientRouteEnum.BOOKINGS} />,
  },
  {
    path: ClientRouteEnum.SIGN_IN,
    Component: SignIn,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.SIGN_UP,
    Component: SignUp,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.PASSWORD_RECOVERY,
    Component: PasswordRecovery,
    notAuthOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.SIGN_UP_LAST_STEP,
    Component: SignUpLastStep,
    authOnly: true,
    redirectTo: ClientRouteEnum.BOOKINGS,
  },
  {
    path: ClientRouteEnum.BOOKINGS,
    Component: Bookings,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.REBOOK,
    Component: () => <Bookings />,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.REBOOK_APPOINTMENT,
    Component: RebookAppointment,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.CREATE_APPOINTMENT,
    Component: CreateAppointment,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
  {
    path: ClientRouteEnum.HELP,
    Component: Help,
    authOnly: true,
    redirectTo: ClientRouteEnum.SIGN_IN,
  },
];
