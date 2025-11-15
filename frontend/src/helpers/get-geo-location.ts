import { Coordinates } from '../common/components/google-map/google-map';

const getGeoLocation = (): Promise<Coordinates> => {
  return new Promise((res, rej) => {
    const success = (position: any) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      res({ lat, lng });
    };

    const error = () => {
      rej('Unable to retrieve your location');
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      rej('Geolocation not supported');
    }
  });
};

export default getGeoLocation;
