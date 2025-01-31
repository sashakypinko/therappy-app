import type Action from '../action.interface';
import {
  GET_APPOINTMENTS_REQUEST,
  GET_APPOINTMENTS_SUCCESS,
  GET_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  UPDATE_APPOINTMENT_REQUEST,
  UPDATE_APPOINTMENT_SUCCESS,
  UPDATE_APPOINTMENT_FAILURE,
  REMOVE_APPOINTMENT_REQUEST,
  REMOVE_APPOINTMENT_SUCCESS,
  REMOVE_APPOINTMENT_FAILURE,
  REQUEST_REFUND_APPOINTMENT_REQUEST,
  REQUEST_REFUND_APPOINTMENT_SUCCESS,
  REQUEST_REFUND_APPOINTMENT_FAILURE,
} from './action-types';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { IAppointment } from '../../../services/api/appointment/dto/appointment.dto';

export const getAppointments = (
  query: object,
  onSuccess: () => void = () => {
    //
  },
  onError: (errors: any) => void = () => {
    //
  },
): Action => ({
  type: GET_APPOINTMENTS_REQUEST,
  payload: query,
  meta: {
    onSuccess,
    onError,
  },
});

export const getAppointmentsSuccess = (responseData: DataTableResponse<IAppointment>): Action => ({
  type: GET_APPOINTMENTS_SUCCESS,
  payload: responseData,
});

export const getAppointmentsError = (error: any): Action => ({
  type: GET_APPOINTMENTS_FAILURE,
  payload: error,
});

export const createAppointment = (
  appointment: IAppointment,
  onSuccess: (newAppointment: IAppointment) => void,
  onError?: (errors: any) => void,
): Action => ({
  type: CREATE_APPOINTMENT_REQUEST,
  payload: appointment,
  meta: {
    onSuccess,
    onError,
  },
});

export const createAppointmentSuccess = (): Action => ({
  type: CREATE_APPOINTMENT_SUCCESS,
});

export const createAppointmentError = (error: any): Action => ({
  type: CREATE_APPOINTMENT_FAILURE,
  payload: error,
});

export const updateAppointment = (
  appointment: IAppointment,
  onSuccess: (newAppointment: IAppointment) => void,
  onError?: (errors: any) => void,
): Action => ({
  type: UPDATE_APPOINTMENT_REQUEST,
  payload: appointment,
  meta: {
    onSuccess,
    onError,
  },
});

export const updateAppointmentSuccess = (): Action => ({
  type: UPDATE_APPOINTMENT_SUCCESS,
});

export const updateAppointmentError = (error: any): Action => ({
  type: UPDATE_APPOINTMENT_FAILURE,
  payload: error,
});

export const removeAppointment = (id: number, onSuccess: () => void, onError?: (errors: any) => void): Action => ({
  type: REMOVE_APPOINTMENT_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const removeAppointmentSuccess = (): Action => ({
  type: REMOVE_APPOINTMENT_SUCCESS,
});

export const removeAppointmentError = (error: any): Action => ({
  type: REMOVE_APPOINTMENT_FAILURE,
  payload: error,
});

export const requestRefundAppointment = (id: number, onSuccess: () => void, onError?: (errors: any) => void): Action => ({
  type: REQUEST_REFUND_APPOINTMENT_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const requestRefundAppointmentSuccess = (): Action => ({
  type: REQUEST_REFUND_APPOINTMENT_SUCCESS,
});

export const requestRefundAppointmentError = (error: any): Action => ({
  type: REQUEST_REFUND_APPOINTMENT_FAILURE,
  payload: error,
});
