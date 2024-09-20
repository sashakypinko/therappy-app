export enum AppointmentStatusesEnum {
  NEW,
  PENDING,
  ACCEPTED,
  STARTED,
  FINISHED,
  CANCELED,
}

export const AppointmentTimeLabels = {
  [AppointmentStatusesEnum.NEW]: 'New',
  [AppointmentStatusesEnum.PENDING]: 'Pending',
  [AppointmentStatusesEnum.ACCEPTED]: 'Confirmed',
  [AppointmentStatusesEnum.STARTED]: 'Started',
  [AppointmentStatusesEnum.FINISHED]: 'Finished',
  [AppointmentStatusesEnum.CANCELED]: 'Cancelled',
};
