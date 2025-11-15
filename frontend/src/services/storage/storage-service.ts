export default class StorageService {
  store = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  get = (key: string): any => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  };

  remove = (key: string): void => {
    localStorage.removeItem(key);
  };
}
