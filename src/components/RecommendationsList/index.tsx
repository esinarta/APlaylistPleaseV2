import { Artist, Track } from "@spotify/web-api-ts-sdk";
import Seed from "./Seed";

const RecommendationsList = ({
  recommendations,
  recommendationSeeds,
}: {
  recommendations: Track[];
  recommendationSeeds: (Track | Artist)[];
}) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="flex flex-col items-center">
      Here&apos;s a playlist based on recommendations for:
      <div className=" flex flex-row gap-4">
        {recommendationSeeds.map((seed) => (
          <Seed key={seed.id} seed={seed} />
        ))}
      </div>
      <ul>
        {recommendations.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationsList;
