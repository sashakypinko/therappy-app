import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import { PublicServiceApi, ServiceApi } from '../../services/api/service';
import type Action from '../actions/action.interface';
import {
  getServicesSuccess,
  getServicesError,
  updateServiceSuccess,
  updateServiceError,
  deleteServiceSuccess,
  deleteServiceError,
  createServiceSuccess,
  createServiceError,
} from '../actions/services';

export function* getServices({ payload }: Action): SagaIterator {
  try {
    const data = yield call(PublicServiceApi.getByQuery, payload);
    yield put(getServicesSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getServicesError(error));
  }
}

export function* createService({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ServiceApi.create, payload.id, payload);
    yield put(createServiceSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(createServiceError(error));
    meta.onError();
  }
}

export function* updateService({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ServiceApi.update, payload.id, payload);
    yield put(updateServiceSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(updateServiceError(error));
    meta.onError();
  }
}

export function* deleteService({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ServiceApi.deleteById, payload);
    yield put(deleteServiceSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(deleteServiceError(error));
    meta.onError();
  }
}
