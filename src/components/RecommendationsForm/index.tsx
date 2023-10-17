import { Artist, Track } from "@spotify/web-api-ts-sdk";

const RecommendationsForm = ({
  recommendationSeeds,
  setRecommendationSeeds,
}: {
  recommendationSeeds: (Artist | Track)[];
  setRecommendationSeeds: (seeds: (Artist | Track)[]) => void;
}) => {
  if (recommendationSeeds.length > 5) return <div>Max 5 seeds allowed</div>;

  const deleteSeed = (seedId: string) => {
    setRecommendationSeeds(recommendationSeeds.filter((s) => s.id !== seedId));
  };

  return (
    <div>
      Recommendations for:
      <ul>
        {recommendationSeeds.map((seed) => (
          <li key={seed.id}>
            {seed.name}
            <button onClick={() => deleteSeed(seed.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsForm;
