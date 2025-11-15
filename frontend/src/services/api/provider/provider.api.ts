import ApiService from '../api-service';
import { IProvider } from './dto/provider.dto';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { UserTypesEnum } from '../../../enums/user-types.enum';
import { BankDetails, IUser } from "../user/dto/user.dto";
import { BlockUserRequestDto } from './dto/block-user-request.dto';
import { IClient } from "../client/dto/client.dto";
import { ServiceNotFoundRequestDto } from "./dto/service-not-found-request.dto";

class ProviderApiService extends ApiService {
  getById = async (id: number): Promise<IProvider> => await this.get(`/${id}`).then((res) => res.data[0]);

  getByQuery = async (
    query: any,
    type: UserTypesEnum = UserTypesEnum.PROVIDER,
  ): Promise<DataTableResponse<IProvider>> =>
    await this.post('', { ...query, filter: { ...(query.filter || {}), type } }).then((res) => res.data);

  update = async (id: number, provider: IProvider): Promise<any> => {
    return await this.post(`/${id}/update`, provider, false).then((res) => res.data);
  };

  deleteById = async (id: number): Promise<IProvider> => await this.delete(`/${id}`).then((res) => res.data);

  getBlockedUsers = async (query: object): Promise<DataTableResponse<IUser>> =>
    await this.post(`/blocked/list`, query).then((res) => res.data);

  blockUsers = async (requestData: BlockUserRequestDto): Promise<IUser> =>
    await this.post(`/blocked/block-user`, requestData, false).then((res) => res.data);

  editBankDetails = async (id: number, requestData: BankDetails): Promise<BankDetails> =>
    await this.post(`/${id}/edit-bank-details`, requestData, false).then((res) => res.data);

  getBankDetails = async (id: number): Promise<BankDetails> =>
    await this.get(`/${id}/bank-details`).then((res) => res.data);

  serviceNotFound = async (data: ServiceNotFoundRequestDto): Promise<any> =>
    await this.post(`/service-not-found`, data, false).then((res) => res.data);
}

export const ProviderApi = new ProviderApiService('therapists');
