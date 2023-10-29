import { Artist, Track } from "@spotify/web-api-ts-sdk";
import Image from "next/image";

const Seed = ({ seed }: { seed: Track | Artist }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        className="object-none"
        src={
          seed.type === "artist"
            ? (seed as Artist).images[0].url
            : (seed as Track).album.images[0].url
        }
        alt={seed.name}
        width={150}
        height={150}
      />
      <div>{seed.name}</div>
    </div>
  );
};

export default Seed;
