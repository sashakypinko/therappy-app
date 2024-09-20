import { AppointmentTimeTypesEnum } from '../enums/appointment-time-types.enum';
import { CreateAppointmentDto } from '../services/api/appointment/dto/create-appointment.dto';
import { getHoursInterval } from './date-time.helper';
import { IAppointment } from '../services/api/appointment/dto/appointment.dto';

export const appendIntervals = (
  appointment: CreateAppointmentDto | IAppointment,
): CreateAppointmentDto | IAppointment => {
  const hours = getHoursInterval(7 * 60, 21 * 60, 30);

  if (appointment.timeType === AppointmentTimeTypesEnum.AM) {
    appointment.intervals = [{ start: hours[0], end: '12:00:00' }];
  }
  if (appointment.timeType === AppointmentTimeTypesEnum.PM) {
    appointment.intervals = [{ start: '12:00:00', end: '17:00:00' }];
  }
  if (appointment.timeType === AppointmentTimeTypesEnum.EVENING) {
    appointment.intervals = [{ start: '17:00:00', end: hours[hours.length - 1] }];
  }

  return appointment;
};
