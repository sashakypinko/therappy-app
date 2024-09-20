import type { AxiosInstance, AxiosResponse } from 'axios';
import axios from 'axios';
import { setupInterceptorsTo } from './interceptors';

export default class ApiService {
  private readonly instance: AxiosInstance;

  constructor(protected readonly pathPrefix: string) {
    this.instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
    setupInterceptorsTo(this.instance);
  }

  private makeFormData = (data: object = {}) => {
    const formData = new FormData();
    const appendFormData = (dataToAppend: object, path = '') => {
      Object.entries(dataToAppend || {}).forEach(([name, value]) => {
        const newPath = path ? `${path}[${name}]` : name;
        if (name === 'file' || name === 'image') {
          formData.append(newPath, value);
        } else if (typeof value === 'object') {
          appendFormData(value, newPath);
        } else if (typeof value === 'boolean') {
          formData.append(newPath, value ? '1' : '0');
        } else {
          formData.append(newPath, value);
        }
      });
    };
    appendFormData(data);

    return formData;
  };

  get = async (url: string, query = {}, withoutPrefix?: boolean) => {
    return await this.instance.get(`/${!withoutPrefix ? this.pathPrefix : ''}${url}`, { params: query });
  };

  post = async (url: string, data: object = {}, isJson = true, withoutPrefix?: boolean): Promise<AxiosResponse> => {
    return await this.instance.post(`/${!withoutPrefix ? this.pathPrefix : ''}${url}`, isJson ? data : this.makeFormData(data));
  };

  put = async (url: string, data: object = {}, isJson = true): Promise<AxiosResponse> => {
    return await this.instance.put(`/${this.pathPrefix}${url}`, isJson ? data : this.makeFormData(data));
  };

  delete = async (url: string, query = {}): Promise<AxiosResponse> => {
    return await this.instance.delete(`/${this.pathPrefix}${url}`, query);
  };
}
