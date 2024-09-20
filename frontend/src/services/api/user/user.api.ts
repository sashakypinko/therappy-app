import ApiService from '../api-service';
import { type IUser } from './dto/user.dto';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { UserTypesEnum } from '../../../enums/user-types.enum';
import { AxiosResponse } from 'axios';
import { IReview } from './dto/review.dto';
import { IDiscoverQuestions } from './dto/discover-questions.dto';
import { DiscoverQuestionRequestDto } from './dto/discover-question-request.dto';
import { IService } from "../service/dto/service.dto";

class UserApiService extends ApiService {
  getById = async (id: number): Promise<IUser> => await this.get(`/${id}`).then((res) => res.data);

  getByQuery = async (query: object): Promise<DataTableResponse<IUser>> =>
    await this.get('', { ...query, type: UserTypesEnum.CLIENT }).then((res) => res.data);

  update = async (id: number, user: IUser): Promise<IUser> =>
    await this.put(`/${id}`, user, false).then((res) => res.data);

  subscribeOnLaunch = async (data: object): Promise<any> =>
    await this.post('/subscribe-on-launch', data).then((res) => res.data);

  applyEmailVerificationCode = async (userId: number, code: string): Promise<AxiosResponse> =>
    await this.get(`/apply-verification-code/${userId}/${code}`).then((res) => res.data);

  getReviews = async (query: object): Promise<DataTableResponse<IReview>> =>
    await this.get('/reviews', query).then((res) => res.data);

  getDiscoverQuestions = async (): Promise<IDiscoverQuestions> =>
    await this.get('/discover-questions').then((res) => res.data);

  answerDiscoverQuestions = async (data: DiscoverQuestionRequestDto): Promise<any> =>
    await this.post('/answer-discover-questions', data, false).then((res) => res.data);

  sendVerificationCode = async (email: string): Promise<AxiosResponse> =>
    await this.get('/send-verification-code', { email }).then((res) => res.data);
}

export const UserApi = new UserApiService('users');

class AdminUserApiService extends ApiService {
  approve = async (id: number): Promise<any> => await this.post(`/${id}/set-approved-status`).then((res) => res.data);

  decline = async (id: number): Promise<any> => await this.post(`/${id}/set-declined-status`).then((res) => res.data);

  deleteById = async (id: number): Promise<IUser> =>
    await this.post(`/${id}/set-deleted-status`).then((res) => res.data);
}

export const AdminUserApi = new AdminUserApiService('admin/users');
