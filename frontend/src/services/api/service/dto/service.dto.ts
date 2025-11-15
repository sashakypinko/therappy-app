import { ServiceCategoriesEnum } from '../../../../enums/service-categories.enum';
import { ServiceStatusesEnum } from '../../../../enums/service-statuses.enum';

export interface ServiceType {
  price: number;
  duration: number;
  name: string;
  description: string;
}

export interface IService {
  id: number;
  name: string;
  category_id: ServiceCategoriesEnum;
  status: ServiceStatusesEnum;
  description: string;
  duration: number;
  price: number;
  image: string | File | null;
  image_id?: number;
  types?: { [key: number]: ServiceType };
  created_at?: string;
  updated_at?: string;
}

export type ServiceRequest = Omit<IService, 'id'>;
