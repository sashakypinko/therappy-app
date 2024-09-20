import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE, GET_ADDITIONAL_LIST_REQUEST, GET_ADDITIONAL_LIST_SUCCESS, GET_ADDITIONAL_LIST_FAILURE,
} from "../actions/users";
import { dataTableInitValue, UsersState } from '../init-state';
import type Action from '../actions/action.interface';

const users = (state: App.Store.Users = UsersState, { type, payload }: Action) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: null,
      };

    case GET_USERS_FAILURE:
      return {
        ...state,
        users: dataTableInitValue,
        loading: false,
        error: payload,
      };

    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, error: null };

    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: null };

    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, error: null };

    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: payload };

    case GET_ADDITIONAL_LIST_REQUEST:
      return { ...state, error: null };

    case GET_ADDITIONAL_LIST_SUCCESS:
      return { ...state, additionalList: payload, error: null };

    case GET_ADDITIONAL_LIST_FAILURE:
      return { ...state, loading: false, error: payload };

    default:
      return state;
  }
};

export default users;
