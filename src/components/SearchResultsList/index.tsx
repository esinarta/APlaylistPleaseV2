import { SearchResults } from "@spotify/web-api-ts-sdk";

const SearchResultsList = ({
  results,
}: {
  results: SearchResults<"artist"[] | "track"[]> | undefined;
}) => {
  if (!results) return null;

  return (
    <div>
      {results.artists && (
        <ul>
          {results.artists.items.map((artist) => (
            <li key={artist.id}>{artist.name}</li>
          ))}
        </ul>
      )}
      {results.tracks && (
        <ul>
          {results.tracks.items.map((track) => (
            <li key={track.id}>{track.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsList;
