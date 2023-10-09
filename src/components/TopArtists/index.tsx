"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { Artist } from "@spotify/web-api-ts-sdk";

const TopArtists = () => {
  const session = useSession();
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  if (!session || session.status !== "authenticated") {
    redirect("/api/auth/signin");
  }

  useEffect(() => {
    (async () => {
      const res = await sdk.currentUser.topItems("artists");
      setTopArtists(() => res.items);
    })();
  }, []);

  if (!topArtists) return <div>Loading...</div>;

  return (
    <div>
      Top Artists:
      <ul>
        {topArtists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
