import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import { ProviderApi } from '../../services/api/provider';
import type Action from '../actions/action.interface';
import {
  getProvidersSuccess,
  getProvidersError,
  updateProviderSuccess,
  updateProviderError,
  deleteProviderSuccess,
  deleteProviderError,
} from '../actions/providers';
import { AuthStorage } from '../../services/storage/auth.storage';

export function* getProviders({ payload }: Action): SagaIterator {
  try {
    const data = yield call(ProviderApi.getByQuery, payload);
    yield put(getProvidersSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getProvidersError(error));
  }
}

export function* updateProvider({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ProviderApi.update, payload.id, payload);
    yield put(updateProviderSuccess());
    yield call(AuthStorage.updateUser, { redirect: meta.redirect });
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(updateProviderError(error));
    meta.onError();
  }
}

export function* deleteProvider({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ProviderApi.deleteById, payload);
    yield put(deleteProviderSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(deleteProviderError(error));
    meta.onError();
  }
}
