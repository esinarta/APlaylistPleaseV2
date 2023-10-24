import { Track } from "@spotify/web-api-ts-sdk";
import { useState } from "react";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession } from "next-auth/react";

const PlaylistForm = ({ recommendations }: { recommendations: Track[] }) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("private");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!session) return;

    (async () => {
      const playlist = await sdk.playlists.createPlaylist(session.user.id, {
        name,
        description,
        public: visibility === "public",
      });

      await sdk.playlists.addItemsToPlaylist(
        playlist.id,
        recommendations.map((track) => `spotify:track:${track.id}`)
      );
    })();
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Playlist Name: </label>
        <input
          className="text-black"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Playlist Description: </label>
        <input
          className="text-black"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>
          Public
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={visibility === "public"}
            onChange={() => setVisibility("public")}
          />
        </label>
        <label>
          Private
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={visibility === "private"}
            onChange={() => setVisibility("private")}
          />
        </label>
      </div>
      <button type="submit">Create Playlist</button>
    </form>
  );
};

export default PlaylistForm;
