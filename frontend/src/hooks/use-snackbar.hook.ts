import { useDispatch } from 'react-redux';
import {
  clearSnackbar as clearSnackbarAction,
  showErrorSnackbar,
  showInfoSnackbar,
  showSuccessSnackbar,
} from '../store/actions/ui';

interface SnackbarFunctions {
  successSnackbar: (message: string) => void;
  errorSnackbar: (message: string) => void;
  infoSnackbar: (message: string) => void;
  clearSnackbar: () => void;
}

const useSnackbar = (): SnackbarFunctions => {
  const dispatch = useDispatch();

  const successSnackbar = (message: string): void => {
    dispatch(showSuccessSnackbar(message));
  };

  const errorSnackbar = (message: string): void => {
    dispatch(showErrorSnackbar(message));
  };

  const infoSnackbar = (message: string): void => {
    dispatch(showInfoSnackbar(message));
  };

  const clearSnackbar = (): void => {
    dispatch(clearSnackbarAction());
  };

  return {
    successSnackbar,
    errorSnackbar,
    infoSnackbar,
    clearSnackbar,
  };
};

export default useSnackbar;
