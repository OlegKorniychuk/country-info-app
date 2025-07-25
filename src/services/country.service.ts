import {FetchResponse} from 'types/fetchResponse.type';
import {env} from '../env';
import {CountryInfo} from 'types/countryInfo.type';

class CountryService {
  private datenagerBaseUrl = env.DATENAGER_URL;
  private countriesnowBaseUrl = env.COUNTRIESNOW_URL;

  public async getAllCountries(): Promise<FetchResponse<CountryInfo[]>> {
    const response = await fetch(`${this.datenagerBaseUrl}/AvailableCountries`);
    if (!response.ok) {
      return {error: response.status, data: null};
    }
    const data: CountryInfo[] = await response.json();

    return {error: null, data};
  }
}

const countryService = new CountryService();

export default countryService;
