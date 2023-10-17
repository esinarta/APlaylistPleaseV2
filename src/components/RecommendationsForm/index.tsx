import { Artist, Track } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";

const RecommendationsForm = ({
  recommendationSeeds,
  setRecommendationSeeds,
  setRecommendations,
}: {
  recommendationSeeds: (Artist | Track)[];
  setRecommendationSeeds: (seeds: (Artist | Track)[]) => void;
  setRecommendations: (tracks: Track[]) => void;
}) => {
  if (recommendationSeeds.length > 5) return <div>Max 5 seeds allowed</div>;

  const deleteSeed = (seedId: string) => {
    setRecommendationSeeds(recommendationSeeds.filter((s) => s.id !== seedId));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    (async () => {
      const results = await sdk.recommendations.get({
        seed_artists: recommendationSeeds
          .filter((seed) => seed.type === "artist")
          .map((seed) => seed.id),
        seed_tracks: recommendationSeeds
          .filter((seed) => seed.type === "track")
          .map((seed) => seed.id),
      });
      setRecommendations(results.tracks);
    })();
  };

  return (
    <form onSubmit={onSubmit}>
      Recommendations for:
      <ul>
        {recommendationSeeds.map((seed) => (
          <li key={seed.id}>
            {seed.name}
            <button onClick={() => deleteSeed(seed.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RecommendationsForm;
