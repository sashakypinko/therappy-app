import { call, put } from 'redux-saga/effects';
import { type SagaIterator } from 'redux-saga';

import { AppointmentApi } from '../../services/api/appointment';
import type Action from '../actions/action.interface';

import {
  createAppointmentError,
  createAppointmentSuccess,
  getAppointmentsError,
  getAppointmentsSuccess,
  removeAppointmentError,
  removeAppointmentSuccess,
  updateAppointmentError,
  updateAppointmentSuccess,
} from '../actions/appointments';
import { UserTypesEnum } from '../../enums/user-types.enum';
import { AdminAppointmentApi } from '../../services/api/appointment/appointment.api';

const getAppointmentsListEndpointByUserType = (type: UserTypesEnum) => {
  switch (type) {
    case UserTypesEnum.ADMIN:
      return AdminAppointmentApi.getByQuery;
    case UserTypesEnum.CLIENT:
      return AppointmentApi.getForClientByQuery;
    case UserTypesEnum.PROVIDER:
      return AppointmentApi.getForProviderByQuery;
  }
};

export function* getAppointments({ payload, meta }: Action): SagaIterator {
  const { userType, ...requestData } = payload;
  try {
    const data = yield call(getAppointmentsListEndpointByUserType(userType), requestData);
    yield put(getAppointmentsSuccess(data));
    yield call(meta.onSuccess);
  } catch (error: any) {
    console.log([error]);
    yield put(getAppointmentsError(error));
    meta.onError(error);
  }
}

export function* createAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.create, payload);
    yield put(createAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(createAppointmentError(error));
    meta.onError();
  }
}

export function* updateAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.update, payload.id, payload);
    yield put(updateAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(updateAppointmentError(error));
    meta.onError();
  }
}

export function* removeAppointment({ payload, meta }: Action): SagaIterator {
  try {
    const res = yield call(AppointmentApi.clientCancel, payload);
    yield put(removeAppointmentSuccess());
    yield call(meta.onSuccess, res);
  } catch (error: any) {
    console.log([error]);
    yield put(removeAppointmentError(error));
    meta.onError();
  }
}
