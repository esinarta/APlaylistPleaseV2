import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import SpotifyLogo from "../../../public/Spotify_Icon_RGB_Green.png";

const SignIn = () => {
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

export default SignIn;
