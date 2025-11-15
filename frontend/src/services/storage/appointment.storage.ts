import StorageService from './storage-service';
import { CreateAppointmentDto } from '../api/appointment/dto/create-appointment.dto';

class AppointmentStorageService extends StorageService {
  getAppointment = (): CreateAppointmentDto | null => this.get('appointment');

  storeAppointment = (appointment: CreateAppointmentDto): void => {
    this.store('appointment', appointment);
  };

  updateAppointment = (appointment: CreateAppointmentDto): void => {
    const storedAppointment = this.getAppointment();
    this.store('appointment', { ...storedAppointment, ...appointment });
  };

  removeAppointment = (): void => {
    this.remove('appointment');
  };
}

export const AppointmentStorage = new AppointmentStorageService();
