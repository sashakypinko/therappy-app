import { IClient } from '../../client/dto/client.dto';
import { AppointmentStatusesEnum } from '../../../../enums/appointment-statuses.enum';
import { AppointmentTimeTypesEnum } from '../../../../enums/appointment-time-types.enum';
import { IProvider } from '../../provider/dto/provider.dto';
import { IService } from "../../service/dto/service.dto";
import ReviewRequestDto from "./review-request.dto";

export type TimeRange = { start: string; end: string };
export interface IAppointment {
  id: number;
  service_id: number;
  service?: IService;
  phone: string;
  price: number;
  date: string;
  intervals: TimeRange[];
  timeType?: AppointmentTimeTypesEnum;
  start?: string;
  end?: string;
  details: string;
  description: string;
  user: IClient;
  address?: string;
  status: AppointmentStatusesEnum;
  therapist_id?: number;
  therapist?: IProvider;
  created_at?: string;
  review?: ReviewRequestDto | null;
  external_transaction_id?: string | null;
}
