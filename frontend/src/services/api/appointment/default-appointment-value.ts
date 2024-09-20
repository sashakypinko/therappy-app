import { IAppointment } from './dto/appointment.dto';
import { defaultClientValue } from '../client';
import { AppointmentStatusesEnum } from '../../../enums/appointment-statuses.enum';
import { AppointmentTimeTypesEnum } from '../../../enums/appointment-time-types.enum';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

const defaultAppointmentValue: IAppointment = {
  id: 0,
  service_id: 0,
  price: 0,
  date: '',
  intervals: [{ start: '07:00:00', end: '12:00:00' }],
  details: '',
  description: '',
  address: '',
  phone: '',
  user: defaultClientValue,
  status: AppointmentStatusesEnum.PENDING,
};

export const defaultCreateAppointmentValue: CreateAppointmentDto = {
  category_id: 0,
  service_id: 0,
  date: null,
  intervals: [],
  timeType: AppointmentTimeTypesEnum.AM,
  type: null,
  address: '',
  address_description: '',
  latitude: 0,
  longitude: 0,
  price: 0,
  duration: 60,
};

export default defaultAppointmentValue;
