import { lazy } from "react";
import { RouteInterface } from '../../../routes/interfaces/route.interface';
import { PublicRouteEnum } from './enums/route.enum';
import Verification from "../../../common/layouts/auth/verification";
import PrivacyPolicy from "../components/privacy-policy";
import TermsAndConditions from "../components/terms-and-conditions";
import CancellationPolicy from "../components/cancellation-policy";

const Landing = lazy(() => import('../components/landing'));
const TemporaryLanding = lazy(() => import('../components/temp'));
const BookAppointment = lazy(() => import('../components/book-appointment'));


export const routes: RouteInterface[] = [
  {
    path: PublicRouteEnum.ROOT,
    Component: TemporaryLanding,
  },
  {
    path: PublicRouteEnum.LANDING,
    Component: Landing,
  },
  {
    path: PublicRouteEnum.BOOK_APPOINTMENT,
    Component: BookAppointment,
  },
  {
    path: PublicRouteEnum.EMAIL_VERIFICATION,
    Component: Verification,
  },
  {
    path: PublicRouteEnum.APPLY_VERIFICATION_CODE,
    Component: Verification,
  },
  {
    path: PublicRouteEnum.PRIVACY_POLICY,
    Component: PrivacyPolicy,
  },
  {
    path: PublicRouteEnum.TERMS_AND_CONDITIONS,
    Component: TermsAndConditions,
  },
  {
    path: PublicRouteEnum.CANCELLATION_POLICY,
    Component: CancellationPolicy,
  },
];
