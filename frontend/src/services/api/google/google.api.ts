class GoogleApiService {
  makeRequest = async (url: string, params: string) => {
    const res = await fetch(`https://maps.googleapis.com${url}?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}${params}`);
    return await res.json();
  };

  getAddressByCoordinates = async (lat: number, lng: number) =>
    await this.makeRequest('/maps/api/geocode/json', `&latlng=${[lat, lng].join(',')}`);

  getCoordinatesByAddress = async (address: string) =>
    await this.makeRequest('/maps/api/geocode/json', `&address=${address}`);
}

export const GoogleApi = new GoogleApiService();
