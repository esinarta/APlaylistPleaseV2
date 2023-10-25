import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { CommandItem } from "@/components/ui/command";

const SearchResultsList = ({
  results,
  recommendationSeeds,
  setRecommendationSeeds,
}: {
  results: SearchResults<"artist"[] | "track"[]> | undefined;
  recommendationSeeds: (Artist | Track)[];
  setRecommendationSeeds: (seeds: (Artist | Track)[]) => void;
}) => {
  if (!results) return null;

  const addSeed = (seed: Artist | Track) => {
    setRecommendationSeeds([...recommendationSeeds, seed]);
  };

  return (
    <div>
      {results.artists && (
        <div>
          {results.artists.items.map((artist) => (
            <CommandItem
              key={artist.id}
              value={artist.id}
              onSelect={() => addSeed(artist)}
            >
              {artist.name}
            </CommandItem>
          ))}
        </div>
      )}
      {results.tracks && (
        <div>
          {results.tracks.items.map((track) => (
            <CommandItem
              key={track.id}
              value={track.id}
              onSelect={() => addSeed(track)}
            >
              {track.name}
            </CommandItem>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResultsList;
