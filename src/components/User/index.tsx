"use client";

import { signOut, useSession } from "next-auth/react";
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
  const { data: session, status } = useSession();

  if (!session || status !== "authenticated")
    return <div className="h-[40px]" />;

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
};

export default User;
