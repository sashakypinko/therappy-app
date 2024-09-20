import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import { UserApi } from '../../services/api/user';
import type Action from '../actions/action.interface';
import {
  getUsersSuccess,
  getUsersError,
  updateUserSuccess,
  updateUserError,
  deleteUserSuccess,
  deleteUserError, getAdditionalListSuccess, getAdditionalListError,
} from "../actions/users";
import { AdminUserApi } from "../../services/api/user/user.api";
import { AdditionalApi } from "../../services/api/additional";

export function* getUsers({ payload }: Action): SagaIterator {
  try {
    const data = yield call(UserApi.getByQuery, payload);
    yield put(getUsersSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getUsersError(error));
  }
}

export function* updateUser({ payload, meta }: Action): SagaIterator {
  try {
    yield call(UserApi.update, payload.id, payload);
    yield put(updateUserSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(updateUserError(error));
    meta.onError();
  }
}

export function* deleteUser({ payload, meta }: Action): SagaIterator {
  try {
    yield call(AdminUserApi.deleteById, payload);
    yield put(deleteUserSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(deleteUserError(error));
    meta.onError();
  }
}

export function* getAdditionalList(): SagaIterator {
  try {
    const data = yield call(AdditionalApi.getList);
    yield put(getAdditionalListSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getAdditionalListError(error));
  }
}
