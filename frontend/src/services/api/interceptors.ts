import { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { AuthStorage } from '../storage/auth.storage';
import ResponseCodesEnum from './enums/response-codes.enum';

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
  const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    config.headers.Authorization = `Bearer ${AuthStorage.getToken()}`;
    config.withCredentials = false;
    // config.params = { XDEBUG_SESSION_START: 'PHPSTORM' }
    return config;
  };

  const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
    return await Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => response;

  const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
    if (error.response?.status === ResponseCodesEnum.UNAUTHORIZED) {
      if (!AuthStorage.getToken()) {
        return await Promise.reject(error);
      }
      AuthStorage.removeUser();
      AuthStorage.removeToken();
      window.location.reload();
    }

    return await Promise.reject(error);
  };

  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
