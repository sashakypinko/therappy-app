import { type ReactElement } from 'react';
import SuccessSnackbar from './success-snackbar';
import ErrorSnackbar from './error-snackbar';
import InfoSnackbar from './info-snackbar';

const Snackbar = (): ReactElement => (
  <>
    <SuccessSnackbar />
    <ErrorSnackbar />
    <InfoSnackbar />
  </>
);

export default Snackbar;
