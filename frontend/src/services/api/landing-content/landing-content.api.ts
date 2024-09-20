import ApiService from '../api-service';
import { ILandingContent } from './dto/landing-content.dto';

class LandingContentApiService extends ApiService {
  getAll = async (): Promise<ILandingContent> => await this.get('').then((res) => res.data);

  update = async (data: ILandingContent): Promise<ILandingContent> =>
    await this.post('', data).then((res) => res.data);
}

export const LandingContentApi = new LandingContentApiService('landing-contents');
