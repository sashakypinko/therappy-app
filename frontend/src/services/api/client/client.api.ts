import ApiService from '../api-service';
import { IClient } from './dto/client.dto';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { UserTypesEnum } from '../../../enums/user-types.enum';
import { CreateFeedbackRequestDto } from './dto/create-feedback-request.dto';

class ClientApiService extends ApiService {
  getById = async (id: number): Promise<IClient> => await this.get(`/${id}`).then((res) => res.data[0]);

  getByQuery = async (query: any): Promise<DataTableResponse<IClient>> =>
    await this.post(
      'therapists',
      {
        ...query,
        filter: { ...(query.filter || {}), type: UserTypesEnum.CLIENT },
      },
      true,
      true,
    ).then((res) => res.data);

  update = async (id: number, client: IClient): Promise<any> => {
    return await this.post(`/${id}/update`, client, false).then((res) => res.data);
  };

  deleteById = async (id: number): Promise<IClient> => await this.delete(`/${id}`).then((res) => res.data);

  postponeFeedback = async (): Promise<any> => await this.get('/testimonials/remind-later').then((res) => res.data);

  createFeedback = async (requestData: CreateFeedbackRequestDto): Promise<any> =>
    await this.post('/testimonials/create', requestData, false).then((res) => res.data);
}

export const ClientApi = new ClientApiService('customers');
