import { all, takeEvery } from 'redux-saga/effects';

import {
  APPLY_VERIFICATION_CODE_REQUEST,
  GET_AUTH_USER_REQUEST,
  LOGOUT_REQUEST,
  RESET_PASSWORD_REQUEST,
  SEND_VERIFICATION_CODE_REQUEST,
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
  VERIFY_REQUEST,
} from '../actions/auth';
import {
  GET_SERVICES_REQUEST,
  UPDATE_SERVICE_REQUEST,
  DELETE_SERVICE_REQUEST,
  CREATE_SERVICE_REQUEST,
} from '../actions/services';
import {
  GET_USERS_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  GET_ADDITIONAL_LIST_REQUEST,
} from "../actions/users";
import { GET_PROVIDERS_REQUEST, UPDATE_PROVIDER_REQUEST, DELETE_PROVIDER_REQUEST } from '../actions/providers';
import {
  CREATE_APPOINTMENT_REQUEST,
  GET_APPOINTMENTS_REQUEST,
  REMOVE_APPOINTMENT_REQUEST, REQUEST_REFUND_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_REQUEST,
} from '../actions/appointments';
import { GET_CLIENTS_REQUEST, UPDATE_CLIENT_REQUEST, DELETE_CLIENT_REQUEST } from '../actions/clients';

import {
  applyVerificationCode,
  getAuthUser,
  logout,
  resetPassword,
  sendVerificationCode,
  signIn,
  signUp,
  verify,
} from './auth';
import { getServices, updateService, deleteService, createService } from './services';
import { getUsers, updateUser, deleteUser, getAdditionalList } from "./users";
import { getProviders, updateProvider, deleteProvider } from './providers';
import {createAppointment, getAppointments, removeAppointment, requestRefund, updateAppointment} from './appointments';
import { deleteClient, getClients, updateClient } from './clients';

function* rootSaga() {
  yield all([
    takeEvery(SIGN_UP_REQUEST, signUp),
    takeEvery(SIGN_IN_REQUEST, signIn),
    takeEvery(LOGOUT_REQUEST, logout),
    takeEvery(VERIFY_REQUEST, verify),
    takeEvery(SEND_VERIFICATION_CODE_REQUEST, sendVerificationCode),
    takeEvery(APPLY_VERIFICATION_CODE_REQUEST, applyVerificationCode),
    takeEvery(RESET_PASSWORD_REQUEST, resetPassword),
    takeEvery(GET_AUTH_USER_REQUEST, getAuthUser),

    takeEvery(GET_SERVICES_REQUEST, getServices),
    takeEvery(CREATE_SERVICE_REQUEST, createService),
    takeEvery(UPDATE_SERVICE_REQUEST, updateService),
    takeEvery(DELETE_SERVICE_REQUEST, deleteService),

    takeEvery(GET_USERS_REQUEST, getUsers),
    takeEvery(UPDATE_USER_REQUEST, updateUser),
    takeEvery(DELETE_USER_REQUEST, deleteUser),
    takeEvery(GET_ADDITIONAL_LIST_REQUEST, getAdditionalList),

    takeEvery(GET_PROVIDERS_REQUEST, getProviders),
    takeEvery(UPDATE_PROVIDER_REQUEST, updateProvider),
    takeEvery(DELETE_PROVIDER_REQUEST, deleteProvider),

    takeEvery(GET_CLIENTS_REQUEST, getClients),
    takeEvery(UPDATE_CLIENT_REQUEST, updateClient),
    takeEvery(DELETE_CLIENT_REQUEST, deleteClient),

    takeEvery(GET_APPOINTMENTS_REQUEST, getAppointments),
    takeEvery(CREATE_APPOINTMENT_REQUEST, createAppointment),
    takeEvery(UPDATE_APPOINTMENT_REQUEST, updateAppointment),
    takeEvery(REMOVE_APPOINTMENT_REQUEST, removeAppointment),
    takeEvery(REQUEST_REFUND_APPOINTMENT_REQUEST, requestRefund),
  ]);
}

export default rootSaga;
