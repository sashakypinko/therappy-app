import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  SEND_VERIFICATION_CODE_REQUEST,
  SEND_VERIFICATION_CODE_SUCCESS,
  SEND_VERIFICATION_CODE_FAILURE,
  APPLY_VERIFICATION_CODE_REQUEST,
  APPLY_VERIFICATION_CODE_SUCCESS,
  APPLY_VERIFICATION_CODE_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAILURE,
} from '../actions/auth';
import { AuthState } from '../init-state';
import type Action from '../actions/action.interface';

const auth = (state: App.Store.Auth = AuthState, { type, payload }: Action) => {
  switch (type) {
    case SIGN_UP_REQUEST:
      return { ...state, loading: true, error: null };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authData: payload,
        loading: false,
        error: null,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        authData: null,
        loading: false,
        error: payload,
      };

    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authData: payload,
        loading: false,
        error: null,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        authData: null,
        loading: false,
        error: payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        authData: null,
        loading: false,
        error: null,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case SEND_VERIFICATION_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SEND_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case SEND_VERIFICATION_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case APPLY_VERIFICATION_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case APPLY_VERIFICATION_CODE_SUCCESS:
      return {
        ...state,
        resetPasswordToken: payload,
        loading: false,
        error: null,
      };

    case APPLY_VERIFICATION_CODE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case GET_AUTH_USER_REQUEST:
      return {
        ...state,
        authUser: null,
        authUserLoading: true,
        error: null,
      };

    case GET_AUTH_USER_SUCCESS:
      return {
        ...state,
        authUser: payload,
        authUserLoading: false,
        error: null,
      };

    case GET_AUTH_USER_FAILURE:
      return {
        ...state,
        authUser: null,
        authUserLoading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default auth;
