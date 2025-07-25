import {FetchResponse} from 'types/fetchResponse.type';
import {env} from '../../env';
import {
  CountryFullInfo,
  CountryInfo,
  NeighbouringCountryInfo,
  PopulationCount
} from 'types/countryInfo.type';
import {Holiday} from 'types/holiday.type';

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

  public async getCountryInfo(countryCode: string): Promise<FetchResponse<CountryFullInfo>> {
    const bordersResponse = await fetch(`${this.datenagerBaseUrl}/CountryInfo/${countryCode}`);

    if (!bordersResponse.ok) {
      return {error: bordersResponse.status, data: null};
    }

    const flagResponse = await fetch(`${this.countriesnowBaseUrl}/countries/flag/images`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({iso2: countryCode})
    });

    if (!flagResponse.ok) {
      return {error: flagResponse.status, data: null};
    }

    const flagResponseBody = await flagResponse.json();
    const iso3 = flagResponseBody.data.iso3;

    const populationResponse = await fetch(`${this.countriesnowBaseUrl}/countries/population`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({iso3: iso3})
    });

    if (!populationResponse.ok) {
      return {error: populationResponse.status, data: null};
    }

    const borders: NeighbouringCountryInfo[] = (await bordersResponse.json()).borders;
    const populationData: PopulationCount[] = (await populationResponse.json()).data
      .populationCounts;
    const flagUrl = flagResponseBody.data.flag;

    return {error: null, data: {borders, populationData, flagUrl}};
  }

  public async getHolidays(countryCode: string, year: number): Promise<FetchResponse<Holiday[]>> {
    const holidaysResponse = await fetch(
      `${this.datenagerBaseUrl}/PublicHolidays/${year}/${countryCode}`
    );

    if (!holidaysResponse.ok) {
      return {error: holidaysResponse.status, data: null};
    }

    const holidaysData = await holidaysResponse.json();

    return {error: null, data: holidaysData};
  }
}

const countryService = new CountryService();

export default countryService;
