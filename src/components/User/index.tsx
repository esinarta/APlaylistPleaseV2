"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import SpotifyLogo from "../../../public/Spotify_Icon_RGB_Green.png";

const User = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        Signed in as {session.user?.name ?? session.user?.email}
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div>
      <Button onClick={() => signIn("spotify")}>
        <div className="flex items-center gap-2">
          <Image src={SpotifyLogo} alt="Spotify icon" height={24} width={24} />
          Sign in with Spotify
        </div>
      </Button>
    </div>
  );
};

export default User;
