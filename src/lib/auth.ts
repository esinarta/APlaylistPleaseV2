import SpotifyProvider from "next-auth/providers/spotify";

export const authConfig = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
    }),
  ],
};
