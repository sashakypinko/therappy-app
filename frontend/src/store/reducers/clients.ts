import {
  GET_CLIENTS_REQUEST,
  GET_CLIENTS_SUCCESS,
  GET_CLIENTS_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
} from '../actions/clients';
import { dataTableInitValue, ClientsState } from '../init-state';
import type Action from '../actions/action.interface';

const clients = (state: App.Store.Clients = ClientsState, { type, payload }: Action) => {
  switch (type) {
    case GET_CLIENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: payload,
        loading: false,
        error: null,
      };

    case GET_CLIENTS_FAILURE:
      return {
        ...state,
        clients: dataTableInitValue,
        loading: false,
        error: payload,
      };

    case UPDATE_CLIENT_REQUEST:
      return { ...state, saving: true, error: null };

    case UPDATE_CLIENT_SUCCESS:
      return { ...state, saving: false, error: null };

    case UPDATE_CLIENT_FAILURE:
      return { ...state, saving: false, error: payload };

    case DELETE_CLIENT_REQUEST:
      return { ...state, deleting: true, error: null };

    case DELETE_CLIENT_SUCCESS:
      return { ...state, deleting: false, error: null };

    case DELETE_CLIENT_FAILURE:
      return { ...state, deleting: false, error: payload };

    default:
      return state;
  }
};

export default clients;
