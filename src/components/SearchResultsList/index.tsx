import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";
import { CommandGroup, CommandItem } from "@/components/ui/command";

const SearchResultsList = ({
  results,
  addSeed,
}: {
  results: SearchResults<"artist"[] | "track"[]> | undefined;
  addSeed: (seed: Artist | Track) => void;
}) => {
  if (!results) return null;

  return (
    <CommandGroup heading="Search results">
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
              {track.name} - {track.artists[0].name}
            </CommandItem>
          ))}
        </div>
      )}
    </CommandGroup>
  );
};

export default SearchResultsList;
