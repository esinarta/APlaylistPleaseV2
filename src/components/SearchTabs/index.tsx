import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const SearchTabs = ({
  searchType,
  setSearchType,
}: {
  searchType: string;
  setSearchType: (value: "artist" | "track") => void;
}) => {
  const onTabChange = (value: string) => {
    if (value === "artist" || value === "track") setSearchType(value);
  };
  return (
    <Tabs value={searchType} defaultValue="artist" onValueChange={onTabChange}>
      <TabsList>
        <TabsTrigger value="artist" onChange={() => setSearchType("artist")}>
          Artist
        </TabsTrigger>
        <TabsTrigger value="track" onChange={() => setSearchType("track")}>
          Track
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default SearchTabs;
