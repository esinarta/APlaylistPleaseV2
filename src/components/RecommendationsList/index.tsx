import { Artist, Track } from "@spotify/web-api-ts-sdk";

const RecommendationsList = ({
  recommendations,
  recommendationSeeds,
}: {
  recommendations: Track[];
  recommendationSeeds: (Track | Artist)[];
}) => {
  return (
    <div>
      Recommendations based on:
      <ul>
        {recommendationSeeds.map((seed) => (
          <li key={seed.id}>{seed.name}</li>
        ))}
      </ul>
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
