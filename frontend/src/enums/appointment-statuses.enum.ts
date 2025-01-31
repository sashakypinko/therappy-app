export enum AppointmentStatusesEnum {
  NEW,
  PENDING,
  ACCEPTED,
  STARTED,
  FINISHED,
  CANCELED,
  DELETED,
  REFUND_PENDING,
  CANCEL_PENDING,
}

export const AppointmentTimeLabels = {
  [AppointmentStatusesEnum.NEW]: 'New',
  [AppointmentStatusesEnum.PENDING]: 'Pending',
  [AppointmentStatusesEnum.ACCEPTED]: 'Confirmed',
  [AppointmentStatusesEnum.STARTED]: 'Started',
  [AppointmentStatusesEnum.FINISHED]: 'Finished',
  [AppointmentStatusesEnum.REFUND_PENDING]: 'Refund Pending',
  [AppointmentStatusesEnum.CANCEL_PENDING]: 'Cancellation Pending',
  [AppointmentStatusesEnum.CANCELED]: 'Cancelled',
  [AppointmentStatusesEnum.DELETED]: 'Deleted',
};
