"use client";

import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import SearchResultsList from "@/components/SearchResultsList";
import RecommendationsForm from "@/components/RecommendationsForm";
import RecommendationsList from "@/components/RecommendationsList";
import PlaylistForm from "@/components/PlaylistForm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput, CommandList } from "@/components/ui/command";

export default function Home() {
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<SearchResults<"artist"[] | "track"[]>>();
  const [recommendationSeeds, setRecommendationSeeds] = useState<
    (Artist | Track)[]
  >([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);

  const onTabChange = (value: string) => {
    if (value === "artist" || value === "track") setSearchType(value);
  };

  useEffect(() => {
    if (query === "") {
      setResults(undefined);
      return;
    }

    (async () => {
      const results = await sdk.search(query, [searchType]);
      setResults(results);
    })();
  }, [query, searchType]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4">
        <Tabs
          value={searchType}
          defaultValue="artist"
          onValueChange={onTabChange}
        >
          <TabsList>
            <TabsTrigger
              value="artist"
              onChange={() => setSearchType("artist")}
            >
              Artist
            </TabsTrigger>
            <TabsTrigger value="track" onChange={() => setSearchType("track")}>
              Track
            </TabsTrigger>
          </TabsList>
        </Tabs>
        {recommendationSeeds.length > 0 && (
          <RecommendationsForm
            recommendationSeeds={recommendationSeeds}
            setRecommendationSeeds={setRecommendationSeeds}
            setRecommendations={setRecommendations}
          />
        )}
        <Command
          className="w-1/2 rounded-lg border shadow-md"
          shouldFilter={false}
        >
          <CommandInput
            placeholder={
              searchType === "artist" ? "Search by artist" : "Search by track"
            }
            onValueChange={setQuery}
          />
          <CommandList>
            <SearchResultsList
              results={results}
              recommendationSeeds={recommendationSeeds}
              setRecommendationSeeds={setRecommendationSeeds}
            />
          </CommandList>
        </Command>
      </div>

      <RecommendationsList recommendations={recommendations} />
      {recommendations.length > 0 && (
        <PlaylistForm recommendations={recommendations} />
      )}
    </div>
  );
}
