import {
  CitiesType,
  CountriesType,
  IdToCityType,
  IdToCountryType,
  SearchType,
} from "./types";

export function generateSearchList(cities: CitiesType) {
  const result: SearchType[] = [];
  for (const c of cities) {
    result.push({
      id: c.id,
      value: c.name,
    });

    for (const n of c.alt) {
      result.push({
        id: c.id,
        value: n,
      });
    }
  }
  return result;
}

export function generateIdToCity(cities: CitiesType) {
  const result: IdToCityType = {};
  for (const c of cities) {
    result[c.id] = c;
  }
  return result;
}

export function generateIdToCountries(countries: CountriesType) {
  const result: IdToCountryType = {};
  for (const c of countries) {
    result[c.id] = c;
  }
  return result;
}
