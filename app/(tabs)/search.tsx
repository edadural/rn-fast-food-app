import seed from "@/lib/seed";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  return (
    <SafeAreaView>
      <Text>Search</Text>

      <Button
        title="Seed"
        onPress={() => seed().catch((err) => console.log("seed error", err))}
      />
    </SafeAreaView>
  );
};

export default Search;
