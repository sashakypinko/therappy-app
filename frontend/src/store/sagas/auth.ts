import { call, put } from 'redux-saga/effects';
import { AuthApi } from '../../services/api/auth';
import type Action from '../actions/action.interface';
import {
  applyVerificationCodeError,
  applyVerificationCodeSuccess,
  getAuthUserSuccess,
  logoutError,
  logoutSuccess,
  resetPasswordError,
  resetPasswordSuccess,
  sendVerificationCodeError,
  sendVerificationCodeSuccess,
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess,
  verifyError,
  verifySuccess,
} from '../actions/auth';
import { AuthStorage } from '../../services/storage/auth.storage';
import { type SagaIterator } from 'redux-saga';
import { UserApi } from '../../services/api/user';

export function* signUp({ payload, meta }: Action): SagaIterator {
  try {
    const data = yield call(AuthApi.signUp, payload);
    yield put(signUpSuccess({ user: data.auth }));
    yield call(meta.onSuccess, data.auth);
  } catch (error: any) {
    console.log([error]);
    yield put(signUpError(error));
    meta.onError(error?.response?.data || error?.data, error?.response?.status);
  }
}

export function* signIn({ payload, meta }: Action): SagaIterator {
  try {
    const data = yield call(AuthApi.signIn, payload);
    yield put(signInSuccess({ user: data.auth }));
    yield call(AuthStorage.storeUser, data.auth);
    yield call(AuthStorage.storeToken, data.token);
    yield call(meta.onSuccess, data.auth);
  } catch (error: any) {
    console.log([error]);
    yield put(signInError(error));
    meta.onError(error?.response?.data || error?.data, error?.response?.status);
  }
}

export function* logout(): SagaIterator {
  try {
    yield call(AuthStorage.removeUser);
    yield call(AuthStorage.removeToken);
    yield put(logoutSuccess());
    yield call(() => {
      window.location.reload();
    });
  } catch (error) {
    console.log([error]);
    yield put(logoutError(error));
  }
}

export function* verify({ payload, meta }: Action): SagaIterator {
  try {
    const data = yield call(UserApi.applyEmailVerificationCode, payload.userId, payload.code);
    yield put(verifySuccess());
    yield call(AuthStorage.storeUser, { ...data.auth, withoutSidebar: true, redirect: meta.redirect });
    yield call(AuthStorage.storeToken, data.token);
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(verifyError(error));
    meta.onError(error?.response?.data || error?.data, error?.response?.status);
  }
}

export function* sendVerificationCode({ payload }: Action): SagaIterator {
  try {
    yield call(UserApi.sendVerificationCode, payload.email);
    yield put(sendVerificationCodeSuccess());
    yield call(payload.callback);
  } catch (error) {
    console.log([error]);
    yield put(sendVerificationCodeError(error));
  }
}

export function* applyVerificationCode({ payload }: Action): SagaIterator {
  try {
    yield call(AuthApi.applyVerificationCode, payload);
    yield put(applyVerificationCodeSuccess(payload.reset_password_token));
  } catch (error) {
    console.log([error]);
    yield put(applyVerificationCodeError(error));
  }
}

export function* resetPassword({ payload }: Action): SagaIterator {
  try {
    yield call(AuthApi.resetPassword, payload);
    yield put(resetPasswordSuccess());
  } catch (error) {
    console.log([error]);
    yield put(resetPasswordError(error));
  }
}

export function* getAuthUser(): SagaIterator {
  try {
    const data = yield call(AuthApi.getAuthUser);
    yield call(AuthStorage.storeUser, { ...AuthStorage.getUser(), ...data });
    yield put(getAuthUserSuccess(data));
  } catch (error) {
    console.log([error]);
    yield put(resetPasswordError(error));
  }
}
