import ApiService from '../api-service';
import { DataTableResponse } from '../../../interfaces/data-table-response.interface';
import { IAppointment } from './dto/appointment.dto';
import ReviewRequestDto from './dto/review-request.dto';
import CancelRequestDto from './dto/cancel-request.dto';
import AcceptRequestDto from './dto/accept-request.dto';
import CreatePaymentRequestDto from './dto/create-payment-request.dto';
import CompletePaymentRequestDto from './dto/complete-payment-request.dto';
import CreatePaymentResponseDto from './dto/create-payment-response.dto';
import CompletePaymentResponseDto from './dto/complete-payment-response.dto';
import GetTotalsResponseDto from './dto/get-totals-response.dto';

class AppointmentApiService extends ApiService {
  getForClientByQuery = async (query: object): Promise<DataTableResponse<IAppointment>> =>
    await this.post('/customer-list', query).then((res) => res.data);

  getForProviderByQuery = async (query: object): Promise<DataTableResponse<IAppointment>> =>
    await this.post('/therapist-list', query).then((res) => res.data);

  create = async (appointment: IAppointment): Promise<any> => {
    return await this.post('/create', appointment, false).then((res) => res.data);
  };

  update = async (id: number, data: IAppointment): Promise<any> => {
    return await this.post(`/${id}/edit`, data, false).then((res) => res.data);
  };

  accept = async (id: number, data: AcceptRequestDto): Promise<any> => {
    return await this.post(`/${id}/accept`, data, false).then((res) => res.data);
  };

  cancel = async (id: number, data: CancelRequestDto): Promise<any> => {
    return await this.post(`/${id}/therapist-cancel`, data, false).then((res) => res.data);
  };

  clientCancel = async (id: number): Promise<any> => {
    return await this.post(`/${id}/customer-cancel`).then((res) => res.data);
  };

  requestRefund = async (id: number): Promise<any> => {
    return await this.post(`/${id}/request-refund`).then((res) => res.data);
  };

  start = async (id: number): Promise<any> => {
    return await this.post(`/${id}/start`).then((res) => res.data);
  };

  finish = async (id: number): Promise<any> => {
    return await this.post(`/${id}/finish`).then((res) => res.data);
  };

  review = async (id: number, data: ReviewRequestDto): Promise<any> => {
    return await this.post(`/${id}/review`, data, false).then((res) => res.data);
  };

  remove = async (id: number): Promise<any> => {
    return await this.delete(`/${id}/remove`).then((res) => res.data);
  };

  getTotals = async (): Promise<GetTotalsResponseDto> => {
    return await this.get('/get-totals').then((res) => res.data);
  };

  createPayment = async (data: CreatePaymentRequestDto): Promise<CreatePaymentResponseDto> => {
    return await this.post('/payment-create', data, false).then((res) => res.data);
  };

  completePayment = async (data: CompletePaymentRequestDto): Promise<CompletePaymentResponseDto> => {
    return await this.post('/payment-complete', data, false).then((res) => res.data);
  };
}

export const AppointmentApi = new AppointmentApiService('appointments');

class AdminAppointmentService extends ApiService {
  getByQuery = async (query: object): Promise<DataTableResponse<IAppointment>> =>
    await this.post('/list', query).then((res) => res.data);

  getRefundsByQuery = async (query: object): Promise<DataTableResponse<IAppointment>> =>
    await this.post('/list', { tab: 'refund', ...query }).then((res) => res.data);
}

export const AdminAppointmentApi = new AdminAppointmentService('admin/appointments');
