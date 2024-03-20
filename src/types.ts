export type CountryFlagType = {
  name: string;
  code: string;
  emoji: string;
};

export type CodeToFlagType = {
  [code: string]: string;
};

export type CityType = {
  flag: string;
  id: string;
  country_code: string;
  population: number;
  timezone: string;
  coordinates: {
    lon: number;
    lat: number;
  };
};

export type AnswerType = {
  city: CityType;
  names: string[];
};

export type IdToCity = {
  [id: string]: CityType;
};

export type IdToNames = {
  [id: string]: string[];
};

export type SearchType = {
  text: string;
  id: string;
};
