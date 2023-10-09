"use client";
import { signIn, signOut, useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Signed in as {session.user?.name ?? session.user?.email}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }

  return (
    <div>
      Not signed in
      <button onClick={() => signIn("spotify")}>Sign in</button>
    </div>
  );
};

export default User;
