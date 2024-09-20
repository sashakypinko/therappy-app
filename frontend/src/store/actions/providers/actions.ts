import type Action from '../action.interface';
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
} from './action-types';
import { IProvider } from '../../../services/api/provider/dto/provider.dto';
import { ActionCreatorWithMeta } from '../action-creator-types';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { SignUpProviderDetailsRequestDto } from '../../../services/api/auth/dto/sign-up-provider-details-request.dto';

export const getProviders = (query: object): Action => ({
  type: GET_PROVIDERS_REQUEST,
  payload: query,
});

export const getProvidersSuccess = (responseData: DataTableResponse<IProvider>): Action => ({
  type: GET_PROVIDERS_SUCCESS,
  payload: responseData,
});

export const getProvidersError = (error: any): Action => ({
  type: GET_PROVIDERS_FAILURE,
  payload: error,
});

export const updateProvider = (
  provider: IProvider | SignUpProviderDetailsRequestDto,
  redirect: string | boolean,
  onSuccess: () => void,
  onError?: (errors: any) => void,
): Action => ({
  type: UPDATE_PROVIDER_REQUEST,
  payload: provider,
  meta: {
    onSuccess,
    onError,
    redirect,
  },
});

export const updateProviderSuccess = (): Action => ({
  type: UPDATE_PROVIDER_SUCCESS,
});

export const updateProviderError = (error: any): Action => ({
  type: UPDATE_PROVIDER_FAILURE,
  payload: error,
});

export const deleteProvider: ActionCreatorWithMeta = (
  id: number,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: DELETE_PROVIDER_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deleteProviderSuccess = (): Action => ({
  type: DELETE_PROVIDER_SUCCESS,
});

export const deleteProviderError = (error: any): Action => ({
  type: DELETE_PROVIDER_FAILURE,
  payload: error,
});
