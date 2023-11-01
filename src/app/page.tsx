"use client";

import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import SearchResultsList from "@/components/SearchResultsList";
import RecommendationsForm from "@/components/RecommendationsForm";
import RecommendationsList from "@/components/RecommendationsList";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import Suggestions from "@/components/Suggestions";

export default function Home() {
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<SearchResults<"artist"[] | "track"[]>>();
  const [recommendationSeeds, setRecommendationSeeds] = useState<
    (Artist | Track)[]
  >([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onTabChange = (value: string) => {
    if (value === "artist" || value === "track") setSearchType(value);
  };

  const addSeed = (seed: Artist | Track) => {
    if (recommendationSeeds.find((s) => s.id === seed.id)) return;
    if (recommendationSeeds.length >= 5) return;

    setQuery("");
    setRecommendationSeeds([...recommendationSeeds, seed]);
    setShowSuggestions(false);
  };

  const reset = () => {
    setQuery("");
    setRecommendationSeeds([]);
    setRecommendations([]);
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
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          A Playlist, Please.
        </h1>
        {!recommendations.length ? (
          <>
            <div className="w-1/2 flex flex-row justify-end gap-4">
              <div className="absolute w-1/2 flex flex-row justify-end gap-4">
                <Command
                  className="rounded-lg border shadow-md"
                  shouldFilter={false}
                >
                  <CommandInput
                    placeholder={
                      searchType === "artist"
                        ? "Search by artist"
                        : "Search by track"
                    }
                    onValueChange={setQuery}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={(e) => {
                      // Prevents onBlur from firing when clicking on a suggestion or result
                      if (
                        !e.relatedTarget?.classList.contains("suggestion") &&
                        !e.relatedTarget?.classList.contains("result")
                      )
                        setShowSuggestions(false);
                    }}
                  />
                  <CommandList>
                    {showSuggestions && (
                      <Suggestions searchType={searchType} addSeed={addSeed} />
                    )}
                    <SearchResultsList results={results} addSeed={addSeed} />
                  </CommandList>
                </Command>
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
                    <TabsTrigger
                      value="track"
                      onChange={() => setSearchType("track")}
                    >
                      Track
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <div className="w-1/2 flex justify-center items-center mt-16">
              {recommendationSeeds.length > 0 && (
                <RecommendationsForm
                  recommendationSeeds={recommendationSeeds}
                  setRecommendationSeeds={setRecommendationSeeds}
                  setRecommendations={setRecommendations}
                />
              )}
            </div>
          </>
        ) : (
          <div className="w-1/2">
            <RecommendationsList
              recommendations={recommendations}
              recommendationSeeds={recommendationSeeds}
              reset={reset}
            />
          </div>
        )}
      </div>
    </div>
  );
}
