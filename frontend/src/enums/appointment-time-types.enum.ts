export enum AppointmentTimeTypesEnum {
  AM = 1,
  PM,
  EVENING,
  SPECIFIC,
}

export const AppointmentTimeTypeLabels = {
  [AppointmentTimeTypesEnum.AM]: 'AM',
  [AppointmentTimeTypesEnum.PM]: 'PM',
  [AppointmentTimeTypesEnum.EVENING]: 'Evening',
  [AppointmentTimeTypesEnum.SPECIFIC]: 'Specific time range',
};
