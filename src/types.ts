export type CitiesType = CityType[];

export type IdToCityType = { [id: string]: CityType };

export type CityType = {
  id: string;
  name: string;
  alt: string[];
  country: string;
  population: number;
  timezone: string;
  mod: string;
  coor: {
    lon: number;
    lat: number;
  };
};

export type CountryType = {
  id: string;
  name: string;
  code: string;
  population: number | null;
  temp: number | null;
  area: number | null;
  capital: string | null;
  flag: {
    emoji: string;
    unicode: string;
  };
};

export type IdToCountryType = { [id: string]: CountryType };

export type CountriesType = CountryType[];

export type SearchType = {
  id: string;
  value: string;
};

export type OpenWeatherType = {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min?: number;
    temp_max?: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  rain?: {
    "1h": number;
    "3h": number;
  };
  snow?: {
    "1h": number;
    "3h": number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
};

export type AnswerWeatherWeatherType = {
  id: number;
  main: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  temp_min?: number;
  temp_max?: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  clouds: number;
  rain?: number;
  snow?: number;
  sunrise: number;
  sunset: number;
};

export type AnswerWeatherItemType = {
  city: CityType;
  country: CountryType;
  weather: AnswerWeatherWeatherType;
};

export type CacheType = {
  [query: string]: AnswerItemSearchType[];
};

export type AnswerWeatherType = {
  time: number;
  response: AnswerWeatherItemType;
};

export type AnswerSearchType = {
  time: number;
  response: AnswerItemSearchType[];
};

export type AnswerItemSearchType = {
  id: string;
  name: string;
  emoji: string;
};
