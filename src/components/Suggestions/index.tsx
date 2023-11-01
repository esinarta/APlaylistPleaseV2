import { Track, Artist } from "@spotify/web-api-ts-sdk";
import { useEffect, useState } from "react";
import { CommandGroup, CommandItem } from "../ui/command";
import sdk from "@/lib/spotify-sdk/ClientInstance";

const NUM_SHOWN = 3;

const Suggestions = ({
  searchType,
  addSeed,
}: {
  searchType: "artist" | "track";
  addSeed: (seed: Artist | Track) => void;
}) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    (async () => {
      const artists = await sdk.currentUser.topItems(
        "artists",
        "short_term",
        NUM_SHOWN
      );
      setTopArtists(() => artists.items);

      const tracks = await sdk.currentUser.topItems(
        "tracks",
        "short_term",
        NUM_SHOWN
      );
      setTopTracks(() => tracks.items);
    })();
  }, []);

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
