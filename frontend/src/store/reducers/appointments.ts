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
} from '../actions/appointments';
import { dataTableInitValue, AppointmentsState } from '../init-state';
import type Action from '../actions/action.interface';

const appointments = (state: App.Store.Appointments = AppointmentsState, { type, payload }: Action) => {
  switch (type) {
    case GET_APPOINTMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: payload,
        loading: false,
        error: null,
      };

    case GET_APPOINTMENTS_FAILURE:
      return {
        ...state,
        appointments: dataTableInitValue,
        loading: false,
        error: payload,
      };

    case CREATE_APPOINTMENT_REQUEST:
      return { ...state, updating: true, error: null };

    case CREATE_APPOINTMENT_SUCCESS:
      return { ...state, updating: false, error: null };

    case CREATE_APPOINTMENT_FAILURE:
      return { ...state, updating: false, error: payload };

    case UPDATE_APPOINTMENT_REQUEST:
      return { ...state, updating: true, error: null };

    case UPDATE_APPOINTMENT_SUCCESS:
      return { ...state, updating: false, error: null };

    case UPDATE_APPOINTMENT_FAILURE:
      return { ...state, updating: false, error: payload };

    case REMOVE_APPOINTMENT_REQUEST:
      return { ...state, updating: true, error: null };

    case REMOVE_APPOINTMENT_SUCCESS:
      return { ...state, updating: false, error: null };

    case REMOVE_APPOINTMENT_FAILURE:
      return { ...state, updating: false, error: payload };

    default:
      return state;
  }
};

export default appointments;
