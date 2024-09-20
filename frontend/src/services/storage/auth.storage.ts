import StorageService from './storage-service';
import { IUser } from '../api/user/dto/user.dto';

class AuthStorageService extends StorageService {
  storeUser = (user: any): void => {
    this.store('user', user);
  };

  storeToken = (token: string | undefined): void => {
    this.store('token', token);
  };

  updateUser = (user: any): void => {
    const storedUser = this.getUser();
    this.store('user', { ...storedUser, ...user });
  };

  getUser = (): IUser | null => this.get('user');

  getToken = (): string | null => this.get('token');

  removeUser = (): void => {
    this.remove('user');
  };

  removeToken = (): void => {
    this.remove('token');
  };

  storeLastCodeSendTime = (time: number): void => {
    this.store('lastCodeSendTime', time);
  };

  getLastCodeSendTime = (): number | null => this.get('lastCodeSendTime');

  removeLastCodeSendTime = (): void => {
    this.remove('lastCodeSendTime');
  };
}

export const AuthStorage = new AuthStorageService();
