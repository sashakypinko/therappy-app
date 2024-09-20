import ApiService from '../api-service';
import { IAdditional } from "./dto/additional.dto";

class AdditionalApiService extends ApiService {
  getList = async (): Promise<IAdditional[]> => await this.get('/questions').then((res) => res.data);
}

export const AdditionalApi = new AdditionalApiService('additional');
