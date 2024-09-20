export enum ServiceStatusesEnum {
  INACTIVE,
  ACTIVE,
}

export const ParsedServiceStatuses = {
  [ServiceStatusesEnum.INACTIVE]: 'Inactive',
  [ServiceStatusesEnum.ACTIVE]: 'Active',
};
