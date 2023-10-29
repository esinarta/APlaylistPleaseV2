import { Artist, Track } from "@spotify/web-api-ts-sdk";
import Seed from "./Seed";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PlaylistForm from "../PlaylistForm";

const RecommendationsList = ({
  recommendations,
  recommendationSeeds,
  reset,
}: {
  recommendations: Track[];
  recommendationSeeds: (Track | Artist)[];
  reset: () => void;
}) => {
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 mb-4">
        <div className="text-sm font-medium">
          Here&apos;s a playlist based on recommendations for:
        </div>
        <div className=" flex flex-row gap-4">
          {recommendationSeeds.map((seed) => (
            <Seed key={seed.id} seed={seed} />
          ))}
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          {recommendations.map((track) => (
            <div
              key={track.id}
              className=" flex flex-row justify-between items-center rounded-lg border px-2 py-1"
            >
              <div className="text-sm truncate text-ellipsis">
                {track.name} - {track.artists[0].name}
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 flex flex-row justify-between">
          <Button variant="outline" onClick={reset}>
            Back
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button>Save</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Save Playlist</DialogTitle>
                <PlaylistForm recommendations={recommendations} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default RecommendationsList;
