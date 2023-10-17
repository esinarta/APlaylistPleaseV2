import { Artist, SearchResults, Track } from "@spotify/web-api-ts-sdk";

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
        <ul>
          {results.artists.items.map((artist) => (
            <li key={artist.id}>
              <button onClick={() => addSeed(artist)}>{artist.name}</button>
            </li>
          ))}
        </ul>
      )}
      {results.tracks && (
        <ul>
          {results.tracks.items.map((track) => (
            <li key={track.id}>
              <button onClick={() => addSeed(track)}>{track.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResultsList;
