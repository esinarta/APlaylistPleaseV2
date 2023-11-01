import { Track } from "@spotify/web-api-ts-sdk";
import sdk from "@/lib/spotify-sdk/ClientInstance";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Loader2 } from "lucide-react";

const PlaylistForm = ({ recommendations }: { recommendations: Track[] }) => {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const { data: session } = useSession();

  const formSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    public: z.boolean().default(true),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      public: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!session) return;

    setLoading(true);
    (async () => {
      const playlist = await sdk.playlists.createPlaylist(
        session.user.id,
        values
      );

      await sdk.playlists.addItemsToPlaylist(
        playlist.id,
        recommendations.map((track) => `spotify:track:${track.id}`)
      );

      setSaved(true);
      setLoading(false);
    })();
  };

  if (saved)
    return (
      <div className="flex flex-col items-center gap-2">
        <CheckCircle2 size={128} />
        <div className="font-medium">Playlist saved!</div>
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="public"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <FormLabel>Public</FormLabel>
                <FormDescription>
                  Your playlist will be visible to other users
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </form>
    </Form>
  );
};

export default PlaylistForm;
