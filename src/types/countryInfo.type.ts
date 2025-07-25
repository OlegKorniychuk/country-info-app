export type CountryInfo = {
  countryCode: string;
  name: string;
};

export type NeighbouringCountryInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
};

export type PopulationCount = {
  year: number;
  value: number;
};

export type CountryFullInfo = {
  borders: NeighbouringCountryInfo[];
  populationData: PopulationCount[];
  flagUrl: string;
};
