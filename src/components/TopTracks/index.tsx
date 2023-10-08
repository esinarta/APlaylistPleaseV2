"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { Track } from "@spotify/web-api-ts-sdk";

const TopTracks = () => {
  const session = useSession();
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  if (!session || session.status !== "authenticated") {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    (async () => {
      const res = await sdk.currentUser.topItems("tracks");
      setTopTracks(() => res.items);
    })();
  }, []);

  if (!topTracks) return <div>Loading...</div>;

  return (
    <div>
      Top Tracks:
      <ul>
        {topTracks.map((track) => (
          <li key={track.id}>
            {track.name} - {track.artists[0].name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
