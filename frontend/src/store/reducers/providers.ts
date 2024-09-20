import {
  GET_PROVIDERS_REQUEST,
  GET_PROVIDERS_SUCCESS,
  GET_PROVIDERS_FAILURE,
  UPDATE_PROVIDER_REQUEST,
  UPDATE_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_FAILURE,
  DELETE_PROVIDER_REQUEST,
  DELETE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_FAILURE,
} from '../actions/providers';
import { dataTableInitValue, ProvidersState } from '../init-state';
import type Action from '../actions/action.interface';

const providers = (state: App.Store.Providers = ProvidersState, { type, payload }: Action) => {
  switch (type) {
    case GET_PROVIDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PROVIDERS_SUCCESS:
      return {
        ...state,
        providers: payload,
        loading: false,
        error: null,
      };

    case GET_PROVIDERS_FAILURE:
      return {
        ...state,
        providers: dataTableInitValue,
        loading: false,
        error: payload,
      };

    case UPDATE_PROVIDER_REQUEST:
      return { ...state, saving: true, error: null };

    case UPDATE_PROVIDER_SUCCESS:
      return { ...state, saving: false, error: null };

    case UPDATE_PROVIDER_FAILURE:
      return { ...state, saving: false, error: payload };

    case DELETE_PROVIDER_REQUEST:
      return { ...state, deleting: true, error: null };

    case DELETE_PROVIDER_SUCCESS:
      return { ...state, deleting: false, error: null };

    case DELETE_PROVIDER_FAILURE:
      return { ...state, deleting: false, error: payload };

    default:
      return state;
  }
};

export default providers;
