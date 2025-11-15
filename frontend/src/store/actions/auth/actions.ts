import { type AuthResponseDto } from '../../../services/api/auth/dto/auth-response.dto';
import { type SignInRequestDto } from '../../../services/api/auth/dto/sign-in-request.dto';
import { type SignUpRequestDto } from '../../../services/api/auth/dto/sign-up-request.dto';
import type Action from '../action.interface';
import {
  APPLY_VERIFICATION_CODE_FAILURE,
  APPLY_VERIFICATION_CODE_REQUEST,
  APPLY_VERIFICATION_CODE_SUCCESS,
  GET_AUTH_USER_FAILURE,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  SEND_VERIFICATION_CODE_FAILURE,
  SEND_VERIFICATION_CODE_REQUEST,
  SEND_VERIFICATION_CODE_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from './action-types';
import { ResetPasswordRequestDto } from '../../../services/api/auth/dto/reset-password-request.dto';
import { ResetPasswordResponseDto } from '../../../services/api/auth/dto/reset-password-response.dto';
import { IUser } from '../../../services/api/user/dto/user.dto';
import { IProvider } from '../../../services/api/provider/dto/provider.dto';
import { IClient } from '../../../services/api/client/dto/client.dto';

export const signUp = (
  requestData: SignUpRequestDto,
  onSuccess: (user: IUser) => void,
  onError: (errors: any, status: number) => void,
): Action => ({
  type: SIGN_UP_REQUEST,
  payload: requestData,
  meta: {
    onSuccess,
    onError,
  },
});

export const signUpSuccess = (responseData: AuthResponseDto): Action => ({
  type: SIGN_UP_SUCCESS,
  payload: responseData,
});

export const signUpError = (error: any): Action => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signIn = (
  requestData: SignInRequestDto,
  onSuccess: (user: IUser | IProvider) => void,
  onError: (errors: any, status: number) => void,
): Action => ({
  type: SIGN_IN_REQUEST,
  payload: requestData,
  meta: {
    onSuccess,
    onError,
  },
});

export const signInSuccess = (responseData: AuthResponseDto): Action => ({
  type: SIGN_IN_SUCCESS,
  payload: responseData,
});

export const signInError = (error: any): Action => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const logout = (): Action => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): Action => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = (error: any): Action => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const verify = (
  userId: number,
  code: string,
  redirect: string,
  onSuccess: () => void,
  onError: (errors: any, status: number) => void,
): Action => ({
  type: VERIFY_REQUEST,
  payload: { userId, code },
  meta: {
    onSuccess,
    onError,
    redirect,
  },
});

export const verifySuccess = (): Action => ({
  type: VERIFY_SUCCESS,
});

export const verifyError = (error: any): Action => ({
  type: VERIFY_FAILURE,
  payload: error,
});

export const sendVerificationCode = (email: string, callback: () => void): Action => ({
  type: SEND_VERIFICATION_CODE_REQUEST,
  payload: { email, callback },
});

export const sendVerificationCodeSuccess = (): Action => ({
  type: SEND_VERIFICATION_CODE_SUCCESS,
});

export const sendVerificationCodeError = (error: any): Action => ({
  type: SEND_VERIFICATION_CODE_FAILURE,
  payload: error,
});

export const applyVerificationCode = (code: string): Action => ({
  type: APPLY_VERIFICATION_CODE_REQUEST,
  payload: code,
});

export const applyVerificationCodeSuccess = (data: ResetPasswordResponseDto): Action => ({
  type: APPLY_VERIFICATION_CODE_SUCCESS,
  payload: data,
});

export const applyVerificationCodeError = (error: any): Action => ({
  type: APPLY_VERIFICATION_CODE_FAILURE,
  payload: error,
});

export const resetPassword = (data: ResetPasswordRequestDto): Action => ({
  type: RESET_PASSWORD_REQUEST,
  payload: data,
});

export const resetPasswordSuccess = (): Action => ({
  type: RESET_PASSWORD_SUCCESS,
});

export const resetPasswordError = (error: any): Action => ({
  type: RESET_PASSWORD_FAILURE,
  payload: error,
});

export const getAuthUser = (): Action => ({
  type: GET_AUTH_USER_REQUEST,
});

export const getAuthUserSuccess = (payload: IProvider | IClient | IUser): Action => ({
  type: GET_AUTH_USER_SUCCESS,
  payload,
});

export const getAuthUserError = (error: any): Action => ({
  type: GET_AUTH_USER_FAILURE,
  payload: error,
});
