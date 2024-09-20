import React, { lazy } from "react";
import { AdminRouteEnum } from './enums/route.enum';
import { RouteInterface } from '../../../routes/interfaces/route.interface';
import { Navigate } from 'react-router-dom';
import LandingContent from "../components/pages/landing-content";

const SignIn = lazy(() => import('../components/auth/sign-in'));
const EditProvider = lazy(() => import('../components/pages/edit-provider'));
const ProvidersVerification = lazy(() => import('../components/pages/providers-verification'));
const Services = lazy(() => import('../components/pages/services'));
const Clients = lazy(() => import('../components/pages/clients'));
const Bookings = lazy(() => import('../components/pages/bookings'));
const Providers = lazy(() => import('../components/pages/providers'));

export const routes: RouteInterface[] = [
  {
    path: AdminRouteEnum.ROOT,
    Component: () => <Navigate to={AdminRouteEnum.SERVICES} />,
  },
  {
    path: AdminRouteEnum.SIGN_IN,
    Component: SignIn,
    notAuthOnly: true,
    redirectTo: AdminRouteEnum.SERVICES,
  },
  {
    path: AdminRouteEnum.SERVICES,
    Component: Services,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.CLIENTS,
    Component: Clients,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.BOOKINGS,
    Component: Bookings,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.PROVIDERS,
    Component: Providers,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.EDIT_PROVIDER,
    Component: EditProvider,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.PROVIDERS_VERIFICATION,
    Component: ProvidersVerification,
    authOnly: true,
  },
  {
    path: AdminRouteEnum.LANDING_CONTENT,
    Component: LandingContent,
    authOnly: true,
  },
  // {
  //   path: AdminRouteEnum.REPORTS,
  //   Component: Reports,
  //   authOnly: true,
  // },
];
