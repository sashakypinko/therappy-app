export enum WorkingVisaTypesEnum {
  NO_VISA,
  TYPE_1,
  TYPE_2,
  TYPE_3,
}

export const ParsedUserStatuses = {
  [WorkingVisaTypesEnum.NO_VISA]: 'No working visa',
  [WorkingVisaTypesEnum.TYPE_1]: 'Type 1',
  [WorkingVisaTypesEnum.TYPE_2]: 'Type 2',
  [WorkingVisaTypesEnum.TYPE_3]: 'Type 3',
};
