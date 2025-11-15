import { IProvider, ProviderAdditional, ProviderAdditionals } from '../services/api/provider/dto/provider.dto';
import { IService } from '../services/api/service/dto/service.dto';
import { ProviderAdditionalsEnum } from '../enums/provider-additionals.enum';
import { CategoryLabels } from '../enums/service-categories.enum';
import { Schedule } from '../common/components/working-time-scheduler/day-item/types/schedule.type';

export const prepareEditableProvider = (provider: IProvider): IProvider => {
  const editableAdditionals: ProviderAdditionals = {};
  const editableScheduleOverrides: Schedule = {};

  (provider.additionals as unknown as (ProviderAdditional & { additional_id: number })[]).forEach((item) => {
    if (item.additional_id === ProviderAdditionalsEnum.OTHER_PROFESSIONAL_REGISTRATIONS) {
      editableAdditionals[item.additional_id] = [
        ...((editableAdditionals[item.additional_id] as ProviderAdditional[]) || []),
        {
          id: item.id,
          media_id: item.media_id,
          file: item.media,
          checked: !!item.checked,
        },
      ];
    } else {
      editableAdditionals[item.additional_id] = { file: item.media, checked: !!item.checked };
    }
  });
  const scheduleOverrides  = (provider.schedule_overrides as unknown as { date: string; start: string; end: string }[]);

  if(Array.isArray(scheduleOverrides)) {
    scheduleOverrides.forEach(
      ({ date, start, end }) => {
        if (!editableScheduleOverrides[date]) {
          editableScheduleOverrides[date] = [];
        }
        editableScheduleOverrides[date].push({ start, end });
      },
    );
  }

  return {
    ...provider,
    services: provider.services.map((item) => (typeof item === 'object' ? (item as IService).id : item)),
    additionals: editableAdditionals,
    schedule_overrides: editableScheduleOverrides,
  };
};

export const workWithChildren = (provider: IProvider): boolean => {
  return (
    !!(provider.additionals as ProviderAdditional[])?.find(
      ({ additional_id }) => additional_id === ProviderAdditionalsEnum.WORK_WITH_CHILDREN,
    )?.checked || false
  );
};

export const getServiceCategories = (provider: IProvider): string => {
  return (provider.services as IService[])
    .map(({ category_id }: IService) => CategoryLabels[category_id])
    .filter((value, index, array) => array.indexOf(value) === index)
    .join(', ');
};
