import { IUser } from '../../user/dto/user.dto';

export interface AuthResponseDto {
  token?: string;
  auth?: IUser;
  user?: IUser;
}
