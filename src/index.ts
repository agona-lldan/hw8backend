import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import Fuse from "fuse.js";
import {
  AnswerItemSearchType,
  AnswerWeatherType,
  CacheType,
  CitiesType,
  CountriesType,
  OpenWeatherType,
  SearchType,
} from "./types";
import { OPEN_WEATHER_API_KEY } from "./constants";
import {
  generateIdToCity,
  generateIdToCountries,
  generateSearchList,
} from "./prepare";
import ky from "ky";

const countries: CountriesType = await Bun.file("./data/countries.json").json();
const cities: CitiesType = await Bun.file("./data/cities.json").json();
const cache: CacheType = await Bun.file("./data/cache.json").json();
const id2city = generateIdToCity(cities);
const id2country = generateIdToCountries(countries);
const search: SearchType[] = generateSearchList(cities);
const fuse: Fuse<SearchType> = new Fuse(search, {
  keys: ["value"],
  includeScore: true,
});

const handleSearch = async ({ params: { q } }: { params: { q: string } }) => {
  const start = new Date().getTime();
  const query: string = decodeURIComponent(q);
  if (cache[query]) {
    return {
      time: new Date().getTime() - start,
      response: cache[query].slice(0, 20),
    };
  }
  const result = Array.from(new Set(fuse.search(query).map((e) => e.item.id)));
  const answer: AnswerItemSearchType[] = [];
  for (const id of result) {
    answer.push({
      id,
      name: id2city[id].name,
      emoji: id2country[id2city[id].country].flag.emoji,
    });
  }
  cache[query] = answer.slice(0, 20);
  await Bun.write("./data/cache.json", JSON.stringify(cache));
  return { time: new Date().getTime() - start, response: answer.slice(0, 20) };
};

const handleWeather = async ({ params: { q } }: { params: { q: string } }) => {
  const start = new Date().getTime();
  const query: string = decodeURIComponent(q);
  const city = id2city[query];
  const country = id2country[city.country];
  if (city === undefined) {
    return null;
  }
  const weather: OpenWeatherType = await ky
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.coor.lat}&lon=${city.coor.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
    )
    .json();
  if (weather.weather.length === 0) {
    return null;
  }
  const ans: AnswerWeatherType = {
    time: new Date().getTime() - start,
    response: {
      city,
      country,
      weather: {
        id: weather.weather[0].id,
        main: weather.weather[0].main,
        description: weather.weather[0].description,
        icon: weather.weather[0].icon,
        temp: weather.main.temp,
        feels_like: weather.main.feels_like,
        temp_min: weather.main.temp_min,
        temp_max: weather.main.temp_max,
        pressure: weather.main.pressure,
        humidity: weather.main.humidity,
        sea_level: weather.main.sea_level,
        grnd_level: weather.main.grnd_level,
        visibility: weather.visibility,
        wind_speed: weather.wind.speed,
        wind_deg: weather.wind.deg,
        clouds: weather.clouds.all,
        rain: weather.rain?.["1h"],
        snow: weather.snow?.["1h"],
        sunrise: weather.sys.sunrise,
        sunset: weather.sys.sunset,
      },
    },
  };
  return ans;
};

console.log("пошла вода горячая ✅ http://localhost:5252");
new Elysia()
  .use(cors())
  .get("/", () => "start")
  .get("/search/:q", handleSearch)
  .get("/weather/:q", handleWeather)
  .listen(5252);
