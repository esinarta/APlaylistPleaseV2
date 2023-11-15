import { Track, Artist } from "@spotify/web-api-ts-sdk";
import { CommandGroup, CommandItem } from "../ui/command";

const Suggestions = ({
  topTracks,
  topArtists,
  searchType,
  addSeed,
}: {
  topTracks: Track[];
  topArtists: Artist[];
  searchType: "artist" | "track";
  addSeed: (seed: Artist | Track) => void;
}) => {
  if (!topTracks.length || !topArtists.length) return null;

  return (
    <>
      <CommandGroup
        heading={`Suggestions from your top ${searchType}s this month`}
      >
        {searchType === "artist" &&
          topArtists.map((artist) => (
            <CommandItem
              className="suggestion"
              key={artist.id}
              value={artist.id}
              onSelect={() => addSeed(artist)}
              tabIndex={0} // Required for input's onBlur event to contain relatedTarget attribute
            >
              {artist.name}
            </CommandItem>
          ))}
        {searchType === "track" &&
          topTracks.map((track) => (
            <CommandItem
              className="suggestion"
              key={track.id}
              value={track.id}
              onSelect={() => addSeed(track)}
              tabIndex={0} // Required for input's onBlur event to contain relatedTarget attribute
            >
              {track.name} - {track.artists[0].name}
            </CommandItem>
          ))}
      </CommandGroup>
    </>
  );
};

export default Suggestions;
