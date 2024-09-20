import { SignUpRequestDto } from './dto/sign-up-request.dto';
import { UserTypesEnum } from '../../../enums/user-types.enum';

const defaultSignUpValue: SignUpRequestDto = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  type: UserTypesEnum.CLIENT,
};

export default defaultSignUpValue;
