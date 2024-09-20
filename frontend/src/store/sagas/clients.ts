import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import type Action from '../actions/action.interface';

import { AuthStorage } from '../../services/storage/auth.storage';
import { ClientApi } from '../../services/api/client/client.api';
import {
  deleteClientError,
  deleteClientSuccess,
  getClientsError,
  getClientsSuccess,
  updateClientError,
  updateClientSuccess,
} from '../actions/clients';
import { ProviderApi } from '../../services/api/provider';
import { UserTypesEnum } from '../../enums/user-types.enum';
import { AdminUserApi } from "../../services/api/user/user.api";

export function* getClients({ payload }: Action): SagaIterator {
  try {
    const data = yield call(ProviderApi.getByQuery, payload, UserTypesEnum.CLIENT);
    yield put(getClientsSuccess(data));
  } catch (error: any) {
    console.log([error]);
    yield put(getClientsError(error));
  }
}

export function* updateClient({ payload, meta }: Action): SagaIterator {
  try {
    yield call(ClientApi.update, payload.id, payload);
    yield put(updateClientSuccess());
    yield call(AuthStorage.updateUser, { redirect: meta.redirect });
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(updateClientError(error));
    meta.onError();
  }
}

export function* deleteClient({ payload, meta }: Action): SagaIterator {
  try {
    yield call(AdminUserApi.deleteById, payload);
    yield put(deleteClientSuccess());
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(deleteClientError(error));
    meta.onError();
  }
}
