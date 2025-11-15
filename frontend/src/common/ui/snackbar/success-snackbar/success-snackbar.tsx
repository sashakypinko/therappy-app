import { type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { selectSuccessSnackbar } from '../../../../store/selectors';
import { clearSnackbar } from '../../../../store/actions/ui';

const SuccessSnackbar = (): ReactElement => {
  const dispatch = useDispatch();

  const message = useSelector(selectSuccessSnackbar);

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={!!message}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <Alert severity="success">{message}</Alert>
    </MuiSnackbar>
  );
};

export default SuccessSnackbar;
