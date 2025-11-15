import type Action from '../action.interface';
import {
  GET_SERVICES_REQUEST,
  GET_SERVICES_SUCCESS,
  GET_SERVICES_FAILURE,
  CREATE_SERVICE_REQUEST,
  CREATE_SERVICE_SUCCESS,
  CREATE_SERVICE_FAILURE,
  UPDATE_SERVICE_REQUEST,
  UPDATE_SERVICE_SUCCESS,
  UPDATE_SERVICE_FAILURE,
  DELETE_SERVICE_REQUEST,
  DELETE_SERVICE_SUCCESS,
  DELETE_SERVICE_FAILURE,
} from './action-types';
import { IService } from '../../../services/api/service/dto/service.dto';
import { ActionCreatorWithMeta } from '../action-creator-types';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { DataTableRequest } from "../../../interfaces/data-table-request.interface";

export const getServices = (query: DataTableRequest<IService>): Action => ({
  type: GET_SERVICES_REQUEST,
  payload: query,
});

export const getServicesSuccess = (responseData: DataTableResponse<IService>): Action => ({
  type: GET_SERVICES_SUCCESS,
  payload: responseData,
});

export const getServicesError = (error: any): Action => ({
  type: GET_SERVICES_FAILURE,
  payload: error,
});

export const createService: ActionCreatorWithMeta = (
  service: IService,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: CREATE_SERVICE_REQUEST,
  payload: service,
  meta: {
    onSuccess,
    onError,
  },
});

export const createServiceSuccess = (): Action => ({
  type: CREATE_SERVICE_SUCCESS,
});

export const createServiceError = (error: any): Action => ({
  type: CREATE_SERVICE_FAILURE,
  payload: error,
});

export const updateService: ActionCreatorWithMeta = (
  service: IService,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: UPDATE_SERVICE_REQUEST,
  payload: service,
  meta: {
    onSuccess,
    onError,
  },
});

export const updateServiceSuccess = (): Action => ({
  type: UPDATE_SERVICE_SUCCESS,
});

export const updateServiceError = (error: any): Action => ({
  type: UPDATE_SERVICE_FAILURE,
  payload: error,
});

export const deleteService: ActionCreatorWithMeta = (
  id: number,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: DELETE_SERVICE_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deleteServiceSuccess = (): Action => ({
  type: DELETE_SERVICE_SUCCESS,
});

export const deleteServiceError = (error: any): Action => ({
  type: DELETE_SERVICE_FAILURE,
  payload: error,
});
