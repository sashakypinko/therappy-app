import { SNACKBAR_CLEAR, SNACKBAR_ERROR, SNACKBAR_INFO, SNACKBAR_SUCCESS } from '../actions/ui';
import { UIState } from '../init-state';
import type Action from '../actions/action.interface';

const languages = (state: App.Store.UI = UIState, { type, payload }: Action) => {
  switch (type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        successSnackbar: payload,
      };

    case SNACKBAR_ERROR:
      return {
        ...state,
        errorSnackbar: payload,
      };

    case SNACKBAR_INFO:
      return {
        ...state,
        infoSnackbar: payload,
      };

    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbar: '',
        errorSnackbar: '',
        infoSnackbar: '',
      };

    default:
      return state;
  }
};

export default languages;
