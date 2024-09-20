import type Action from '../action.interface';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  GET_ADDITIONAL_LIST_REQUEST,
  GET_ADDITIONAL_LIST_SUCCESS,
  GET_ADDITIONAL_LIST_FAILURE,
} from './action-types';
import { IUser } from '../../../services/api/user/dto/user.dto';
import { ActionCreatorWithMeta } from '../action-creator-types';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { IAdditional } from "../../../services/api/additional/dto/additional.dto";

export const getUsers = (query: object): Action => ({
  type: GET_USERS_REQUEST,
  payload: query,
});

export const getUsersSuccess = (responseData: DataTableResponse<IUser>): Action => ({
  type: GET_USERS_SUCCESS,
  payload: responseData,
});

export const getUsersError = (error: any): Action => ({
  type: GET_USERS_FAILURE,
  payload: error,
});

export const updateUser: ActionCreatorWithMeta = (
  user: IUser,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
  meta: {
    onSuccess,
    onError,
  },
});

export const updateUserSuccess = (): Action => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserError = (error: any): Action => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const deleteUser: ActionCreatorWithMeta = (
  id: number,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: DELETE_USER_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deleteUserSuccess = (): Action => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserError = (error: any): Action => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const getAdditionalList = (): Action => ({
  type: GET_ADDITIONAL_LIST_REQUEST,
});

export const getAdditionalListSuccess = (data: IAdditional[]): Action => ({
  type: GET_ADDITIONAL_LIST_SUCCESS,
  payload: data,
});

export const getAdditionalListError = (error: any): Action => ({
  type: GET_ADDITIONAL_LIST_FAILURE,
  payload: error,
});

