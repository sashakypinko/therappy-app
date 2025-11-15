import { type ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import { selectInfoSnackbar } from '../../../../store/selectors';
import { clearSnackbar } from '../../../../store/actions/ui';

const InfoSnackbar = (): ReactElement => {
  const dispatch = useDispatch();

  const message = useSelector(selectInfoSnackbar);

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
      <Alert severity="info">{message}</Alert>
    </MuiSnackbar>
  );
};

export default InfoSnackbar;
