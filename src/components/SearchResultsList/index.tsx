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
              className="result"
              key={artist.id}
              value={artist.id}
              onSelect={() => addSeed(artist)}
              tabIndex={0} // Required for input's onBlur event to contain relatedTarget attribute
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
              className="result"
              key={track.id}
              value={track.id}
              onSelect={() => addSeed(track)}
              tabIndex={0} // Required for input's onBlur event to contain relatedTarget attribute
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
