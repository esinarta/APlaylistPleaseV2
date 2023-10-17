"use client";

import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import SearchResultsList from "@/components/SearchResultsList";
import RecommendationsForm from "@/components/RecommendationsForm";
import RecommendationsList from "@/components/RecommendationsList";

export default function Home() {
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<SearchResults<"artist"[] | "track"[]>>();
  const [recommendationSeeds, setRecommendationSeeds] = useState<
    (Artist | Track)[]
  >([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);

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
      <div className="flex flex-row gap-12">
        <SearchResultsList
          results={results}
          recommendationSeeds={recommendationSeeds}
          setRecommendationSeeds={setRecommendationSeeds}
        />
        <RecommendationsForm
          recommendationSeeds={recommendationSeeds}
          setRecommendationSeeds={setRecommendationSeeds}
          setRecommendations={setRecommendations}
        />
      </div>
      <RecommendationsList recommendations={recommendations} />
    </div>
  );
}
