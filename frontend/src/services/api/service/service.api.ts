import ApiService from '../api-service';
import { IService } from './dto/service.dto';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';

class ServiceApiService extends ApiService {
  create = async (id: number, service: IService): Promise<IService> => {
    return await this.post('/create', service, false).then((res) => res.data);
  };

  update = async (id: number, service: IService): Promise<IService> => {
    return await this.post(`/${id}/update`, service, false).then((res) => res.data);
  };

  deleteById = async (id: number): Promise<IService> => await this.delete(`/${id}`).then((res) => res.data);
}

export const ServiceApi = new ServiceApiService('admin/services');

class PublicServiceApiService extends ApiService {
  getByQuery = async (query: object): Promise<DataTableResponse<IService>> =>
    await this.post('', query).then((res) => res.data);
}
export const PublicServiceApi = new PublicServiceApiService('services');
