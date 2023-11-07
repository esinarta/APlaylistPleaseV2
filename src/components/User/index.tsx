"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import SpotifyLogo from "../../../public/Spotify_Icon_RGB_Green.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const User = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="md:mr-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>
                  {session.user.name.toUpperCase().charAt(0) ??
                    session.user.email.toUpperCase().charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-4 md:mr-8">
            <DropdownMenuLabel>
              Signed in as {session.user?.name ?? session.user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
