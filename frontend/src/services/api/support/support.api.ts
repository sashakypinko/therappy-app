import ApiService from '../api-service';
import { IFaq } from './dto/faq.dto';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { ContactUsRequestDto } from './dto/contact-us-request.dto';

class SupportApiService extends ApiService {
  getFaq = async (): Promise<DataTableResponse<IFaq>> => {
    return await this.post(`/faq/list`).then((res) => res.data);
  };

  contactUs = async (requestData: ContactUsRequestDto): Promise<any> => {
    return await this.post(`/contact-us`, requestData, false).then((res) => res.data);
  };
}

export const SupportApi = new SupportApiService('support');
