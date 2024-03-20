import { CityType, IdToCity, IdToNames, SearchType } from "./types";

const data: IdToCity = await Bun.file("./data/id2city.json").json();

const check: Set<string> = new Set();
const re: string[] = [];
for (const key in data) {
  const k =
    String(data[key].coordinates.lat) + " " + String(data[key].coordinates.lon);
  if (check.has(k)) {
    re.push(key);
  } else {
    check.add(k);
  }
}
console.log(re.length);
