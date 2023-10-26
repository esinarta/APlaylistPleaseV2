import { Artist, Track } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Chip } from "@nextui-org/chip";
import { Label } from "@/components/ui/label";

const RecommendationsForm = ({
  recommendationSeeds,
  setRecommendationSeeds,
  setRecommendations,
}: {
  recommendationSeeds: (Artist | Track)[];
  setRecommendationSeeds: (seeds: (Artist | Track)[]) => void;
  setRecommendations: (tracks: Track[]) => void;
}) => {
  const [size, setSize] = useState(20);

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
        limit: size,
      });
      setRecommendations(results.tracks);
    })();
  };

  return (
    <form
      className="w-1/2 flex flex-row justify-between items-end gap-2"
      onSubmit={onSubmit}
    >
      <div className="flex items-end gap-2">
        {recommendationSeeds.map((seed) => (
          <Chip key={seed.id} onClose={() => deleteSeed(seed.id)}>
            <div className="w-12 truncate text-ellipsis">{seed.name}</div>
          </Chip>
        ))}
      </div>
      <div className="flex flex-row items-end gap-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="size">Playlist Size</Label>
          <Input
            className="w-20"
            type="number"
            name="size"
            value={size}
            min={1}
            max={100}
            onChange={(event) => setSize(parseInt(event.target.value))}
          />
        </div>
        <Button className="flex justify-end" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RecommendationsForm;
