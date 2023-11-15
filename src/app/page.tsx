"use client";

import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import SearchResultsList from "@/components/SearchResultsList";
import RecommendationsForm from "@/components/RecommendationsForm";
import RecommendationsList from "@/components/RecommendationsList";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import Suggestions from "@/components/Suggestions";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import SignIn from "@/components/SignIn";
import SearchTabs from "@/components/SearchTabs";

const NUM_SUGGESTIONS_SHOWN = 3;

export default function Home() {
  const { data: session, status } = useSession();
  const [searchType, setSearchType] = useState<"artist" | "track">("artist");
  const [query, setQuery] = useState("");
  const [results, setResults] =
    useState<SearchResults<"artist"[] | "track"[]>>();
  const [recommendationSeeds, setRecommendationSeeds] = useState<
    (Artist | Track)[]
  >([]);
  const [recommendations, setRecommendations] = useState<Track[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  const addSeed = (seed: Artist | Track) => {
    if (recommendationSeeds.find((s) => s.id === seed.id)) return;
    if (recommendationSeeds.length >= 5) return;

    setQuery("");
    setRecommendationSeeds([...recommendationSeeds, seed]);
    setShowSuggestions(false);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setQuery(value);
  }, 500);

  const reset = () => {
    setQuery("");
    setRecommendationSeeds([]);
    setRecommendations([]);
  };

  useEffect(() => {
    (async () => {
      if (topTracks.length && topArtists.length) return;

      const artists = await sdk.currentUser.topItems(
        "artists",
        "short_term",
        NUM_SUGGESTIONS_SHOWN
      );
      setTopArtists(() => artists.items);

      const tracks = await sdk.currentUser.topItems(
        "tracks",
        "short_term",
        NUM_SUGGESTIONS_SHOWN
      );
      setTopTracks(() => tracks.items);
    })();
  }, [topTracks.length, topArtists.length]);

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
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            A Playlist, Please.
          </h1>
          <div className="text-sm">
            Generate a playlist of recommendations based on a combination of up
            to 5 artists and tracks
          </div>
        </div>
        {!session || status !== "authenticated" ? (
          <SignIn />
        ) : (
          <>
            {!recommendations.length ? (
              <>
                <div className="w-full md:w-1/2 flex flex-row justify-end gap-4">
                  <div className="absolute w-full md:w-1/2 flex flex-row justify-end gap-4 px-8 md:px-0">
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
                        onValueChange={handleSearch}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={(e) => {
                          // Prevents onBlur from firing when clicking on a suggestion or result
                          if (
                            !e.relatedTarget?.classList.contains(
                              "suggestion"
                            ) &&
                            !e.relatedTarget?.classList.contains("result")
                          )
                            setShowSuggestions(false);
                        }}
                      />
                      <CommandList>
                        {session && showSuggestions && !query.length && (
                          <Suggestions
                            topTracks={topTracks}
                            topArtists={topArtists}
                            searchType={searchType}
                            addSeed={addSeed}
                          />
                        )}
                        <SearchResultsList
                          results={results}
                          addSeed={addSeed}
                        />
                      </CommandList>
                    </Command>
                    <SearchTabs
                      searchType={searchType}
                      setSearchType={setSearchType}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center mt-16 px-8 md:px-0">
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
              <div className="w-full md:w-1/2 px-8 md:px-0">
                <RecommendationsList
                  recommendations={recommendations}
                  recommendationSeeds={recommendationSeeds}
                  reset={reset}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
