import type Action from '../action.interface';
import { SNACKBAR_CLEAR, SNACKBAR_ERROR, SNACKBAR_INFO, SNACKBAR_SUCCESS } from './action-types';

export const showSuccessSnackbar = (message: string): Action => ({
  type: SNACKBAR_SUCCESS,
  payload: message,
});

export const showErrorSnackbar = (message: string): Action => ({
  type: SNACKBAR_ERROR,
  payload: message,
});

export const showInfoSnackbar = (message: string): Action => ({
  type: SNACKBAR_INFO,
  payload: message,
});

export const clearSnackbar = (): Action => ({
  type: SNACKBAR_CLEAR,
});
