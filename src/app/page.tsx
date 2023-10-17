"use client";

import { SearchResults } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import SearchResultsList from "@/components/SearchResultsList";

export default function Home() {
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<SearchResults<"artist"[] | "track"[]>>();

  useEffect(() => {
    if (query === "") return;

    (async () => {
      const results = await sdk.search(query, [searchType]);
      setResults(() => results);
    })();
  }, [query, searchType]);

  return (
    <div>
      <label>
        Artist
        <input
          type="radio"
          name="searchType"
          value="artist"
          checked={searchType === "artist"}
          onChange={(event) => setSearchType("artist")}
        />
      </label>
      <label>
        Track
        <input
          type="radio"
          name="searchType"
          value="track"
          checked={searchType === "track"}
          onChange={(event) => setSearchType("track")}
        />
      </label>
      <input onChange={(event) => setQuery(event.target.value)} />
      <SearchResultsList results={results} />
    </div>
  );
}
