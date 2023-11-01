import { Artist, Track } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react";

const RecommendationsForm = ({
  recommendationSeeds,
  setRecommendationSeeds,
  setRecommendations,
}: {
  recommendationSeeds: (Artist | Track)[];
  setRecommendationSeeds: (seeds: (Artist | Track)[]) => void;
  setRecommendations: (tracks: Track[]) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(20);

  const deleteSeed = (seedId: string) => {
    setRecommendationSeeds(recommendationSeeds.filter((s) => s.id !== seedId));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
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
      setLoading(false);
    })();
  };

  return (
    <form className="w-full flex flex-col gap-8 mb-4" onSubmit={onSubmit}>
      <div className="w-full flex flex-col gap-1">
        <div className="text-sm font-medium">
          Generating a playlist based off the following artists and tracks (max
          5)
        </div>
        <div className="flex flex-col gap-2">
          {recommendationSeeds.map((seed) => (
            <div
              key={seed.id}
              className="flex flex-row justify-between items-center rounded-lg border px-2 py-1"
            >
              <div className="text-sm truncate text-ellipsis">{seed.name}</div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteSeed(seed.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="size">Playlist Size (max 50)</Label>
        <Input
          type="number"
          name="size"
          value={size}
          min={1}
          max={100}
          onChange={(event) => setSize(parseInt(event.target.value))}
        />
      </div>
      <Button disabled={loading} type="submit">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Generate
      </Button>
    </form>
  );
};

export default RecommendationsForm;
