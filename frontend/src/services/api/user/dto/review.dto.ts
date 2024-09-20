import { IUser } from './user.dto';

export interface IReview {
  id: number;
  appointment_id: number;
  user_id: number;
  target_id: number;
  comment: string;
  rating: number;
  created_at?: string;
  user?: IUser;
}
