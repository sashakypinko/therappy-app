export enum UserStatusesEnum {
  NEW,
  PENDING,
  APPROVED,
  ACTIVE,
  DECLINED,
  DELETED,
}

export const ParsedUserStatuses = {
  [UserStatusesEnum.NEW]: 'New',
  [UserStatusesEnum.PENDING]: 'Pending',
  [UserStatusesEnum.APPROVED]: 'Approved',
  [UserStatusesEnum.ACTIVE]: 'Active',
  [UserStatusesEnum.DECLINED]: 'Declined',
  [UserStatusesEnum.DELETED]: 'Deleted',
};
