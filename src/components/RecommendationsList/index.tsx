import { Track } from "@spotify/web-api-ts-sdk";

const RecommendationsList = ({
  recommendations,
}: {
  recommendations: Track[];
}) => {
  return (
    <div>
      Recommendations:
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
