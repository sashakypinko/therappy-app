import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
} from '../actions/services';
import { dataTableInitValue, ServicesState } from '../init-state';
import type Action from '../actions/action.interface';

const services = (state: App.Store.Services = ServicesState, { type, payload }: Action) => {
  switch (type) {
    case GET_SERVICES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: payload,
        loading: false,
        error: null,
      };

    case GET_SERVICES_FAILURE:
      return {
        ...state,
        services: dataTableInitValue,
        loading: false,
        error: payload,
      };

    case CREATE_SERVICE_REQUEST:
      return { ...state, saving: true, error: null };

    case CREATE_SERVICE_SUCCESS:
      return { ...state, saving: false, error: null };

    case CREATE_SERVICE_FAILURE:
      return { ...state, saving: false, error: payload };

    case UPDATE_SERVICE_REQUEST:
      return { ...state, saving: true, error: null };

    case UPDATE_SERVICE_SUCCESS:
      return { ...state, saving: false, error: null };

    case UPDATE_SERVICE_FAILURE:
      return { ...state, saving: false, error: payload };

    case DELETE_SERVICE_REQUEST:
      return { ...state, deleting: true, error: null };

    case DELETE_SERVICE_SUCCESS:
      return { ...state, deleting: false, error: null };

    case DELETE_SERVICE_FAILURE:
      return { ...state, deleting: false, error: payload };

    default:
      return state;
  }
};

export default services;
