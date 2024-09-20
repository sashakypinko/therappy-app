import { TimeRange } from './appointment.dto';
import { AppointmentTimeTypesEnum } from '../../../../enums/appointment-time-types.enum';

export interface CreateAppointmentDto {
  category_id: number;
  service_id: number;
  date: string | null;
  timeType: AppointmentTimeTypesEnum;
  intervals: TimeRange[];
  type: number | null;
  address_description: string;
  address: string;
  latitude: number;
  longitude: number;
  price: number;
  duration: number;
}
