import { ServiceRequest } from './dto/service.dto';
import { ServiceStatusesEnum } from '../../../enums/service-statuses.enum';
import { ServiceCategoriesEnum } from '../../../enums/service-categories.enum';

const defaultServiceValue: ServiceRequest = {
  name: '',
  category_id: ServiceCategoriesEnum.MASSAGE,
  status: ServiceStatusesEnum.ACTIVE,
  description: '',
  duration: 60,
  price: 0,
  image: '',
};

export default defaultServiceValue;
