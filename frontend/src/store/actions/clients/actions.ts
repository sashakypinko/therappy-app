import type Action from '../action.interface';
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
} from './action-types';
import { IClient } from '../../../services/api/client/dto/client.dto';
import { ActionCreatorWithMeta } from '../action-creator-types';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';

export const getClients = (query: object): Action => ({
  type: GET_CLIENTS_REQUEST,
  payload: query,
});

export const getClientsSuccess = (responseData: DataTableResponse<IClient>): Action => ({
  type: GET_CLIENTS_SUCCESS,
  payload: responseData,
});

export const getClientsError = (error: any): Action => ({
  type: GET_CLIENTS_FAILURE,
  payload: error,
});

export const updateClient = (
  client: IClient,
  redirect: string | boolean,
  onSuccess: () => void,
  onError?: (errors: any) => void,
): Action => ({
  type: UPDATE_CLIENT_REQUEST,
  payload: client,
  meta: {
    onSuccess,
    onError,
    redirect,
  },
});

export const updateClientSuccess = (): Action => ({
  type: UPDATE_CLIENT_SUCCESS,
});

export const updateClientError = (error: any): Action => ({
  type: UPDATE_CLIENT_FAILURE,
  payload: error,
});

export const deleteClient: ActionCreatorWithMeta = (
  id: number,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: DELETE_CLIENT_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deleteClientSuccess = (): Action => ({
  type: DELETE_CLIENT_SUCCESS,
});

export const deleteClientError = (error: any): Action => ({
  type: DELETE_CLIENT_FAILURE,
  payload: error,
});
