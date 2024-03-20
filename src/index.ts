// потеря городов: 147043 - 109882 = 37161

import { Elysia } from "elysia";
import { AnswerType, IdToCity, IdToNames, SearchType } from "./types";
import Fuse from "fuse.js";

const id2city: IdToCity = await Bun.file("./data/id2city.json").json();
const id2name: IdToNames = await Bun.file("./data/id2name.json").json();
const search: SearchType[] = await Bun.file("./data/search.json").json();
const fuse: Fuse<SearchType> = new Fuse(search, {
  keys: ["text"],
  threshold: 0.1,
});

const handleSearch = async ({ params: { q } }: { params: { q: string } }) => {
  const query: string = decodeURIComponent(q);
  const result = fuse.search(query).map((e) => e.item.id);
  const answer: AnswerType[] = [];
  for (const r of result) {
    answer.push({
      city: id2city[r],
      names: id2name[r],
    });
  }
  return answer;
};

new Elysia()
  .get("/", () => "start")
  .get("/:q", handleSearch)
  .listen(3001);
