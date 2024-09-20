export enum AppointmentTimesEnum {
  AM = 1,
  PM,
  EVENING,
}

export const AppointmentTimeLabels = {
  [AppointmentTimesEnum.AM]: 'AM',
  [AppointmentTimesEnum.PM]: 'PM',
  [AppointmentTimesEnum.EVENING]: 'Evening',
};
