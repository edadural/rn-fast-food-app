import CustomHeader from "@/components/CustomHeader";
import ItemCard from "@/components/ItemCard";
import { icons } from "@/constans";
import { getCategories, getMenuItem } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { Category } from "@/type";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { sides_data, toppings_data } from "./data";

const MenuItemDetails = () => {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { data: item } = useAppwrite({
    fn: getMenuItem,
    params: {
      id: id!,
    },
  });

  const { data: categories } = useAppwrite({
    fn: getCategories,
  }) as { data: Category[] | null };

  const categoryName = categories?.find(
    (category) => category.$id === item?.categories
  )?.name;

  const ItemDetailRow = ({
    label,
    value,
  }: {
    label: string;
    value: string;
  }) => (
    <View className="gap-1">
      <Text className="text-gray-400">{label}</Text>
      <Text>{value}</Text>
    </View>
  );

  const MAX_STARS = 5;
  const stars = Array.from({ length: MAX_STARS }, (_, index) => (
    <Image key={index} source={icons.star} className="mr-1 size-5" />
  ));

  return (
    <SafeAreaView className="h-full pl-5 bg-white">
      <ScrollView>
        <View>
          <View className="pr-5 gap-2">
            <CustomHeader />
            <Text className="font-quicksand-semibold text-2xl">
              {item?.name}
            </Text>
            <Text className="text-lg font-quicksand-semibold text-gray-400">
              {categoryName}
            </Text>
            <View className="flex flex-row items-center">
              {stars}
              <Text className="font-semibold text-gray-400">
                {item?.rating}
              </Text>
            </View>
            <View className="flex flex-row items-center -left-3">
              <Image
                source={icons.dollar}
                className="size-12 -mr-2"
                resizeMode="contain"
              />
              <Text className="text-xl font-quicksand-semibold">
                {item?.price}
              </Text>
            </View>

            <View className="flex flex-row gap-8 mb-3">
              <ItemDetailRow label="Calories" value={`${item?.calories} Cal`} />
              <ItemDetailRow label="Protein" value={`${item?.protein}g`} />
            </View>
            <ItemDetailRow label="Bun Type" value="Whole Wheat" />
          </View>

          <Image
            source={{ uri: item?.image_url }}
            className="absolute top-16 -right-10 size-72 z-[-1]"
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-row justify-between bg-orange-50 px-5 py-3 mt-5 mr-5 rounded-full items-center">
          <View className="flex flex-row items-center">
            <Image
              source={icons.dollar}
              className="size-7"
              resizeMode="contain"
            />
            <Text className="text-sm">Free Delivery</Text>
          </View>
          <View className="flex flex-row items-center">
            <Image
              source={icons.clock}
              className="size-4 mr-2"
              resizeMode="contain"
            />
            <Text className="text-sm">20-30 mins</Text>
          </View>
          <View className="flex flex-row items-center">
            <Image
              source={icons.star}
              className="size-4"
              resizeMode="contain"
            />
            <Text className="text-sm"> {item?.rating}</Text>
          </View>
        </View>

        <View className="flex">
          <Text className="text-gray-400 text-lg my-5">
            The Cheeseburger Wendy's Burger is a classic fast food burger that
            packs a punch of flavor in every bite. Made with a juicy beef patty
            cooked to perfection, it's topped with melted American cheese,
            crispy lettuce, tomato, & crunchy pickles.
          </Text>
        </View>

        <View className="my-5 gap-5">
          <Text className="font-quicksand-bold">Toppings</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {toppings_data.map((item) => (
              <ItemCard key={item.name} name={item.name} image={item.image} />
            ))}
          </ScrollView>
        </View>

        <View className="my-5">
          <Text className="font-quicksand-bold">Side options</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sides_data.map((item) => (
              <ItemCard key={item.name} name={item.name} image={item.image} />
            ))}
          </ScrollView>
        </View>

        <View className="flex flex-row border-2 border-black/10 rounded-3xl mr-5 p-3 justify-between my-5">
          <View className="flex flex-row items-center gap-3">
            <Image
              source={icons.minus}
              className="size-6 bg-orange-50 rounded-lg p-1"
              resizeMode="contain"
            />
            <Text>1</Text>
            <Image
              source={icons.plus}
              className="size-6 bg-orange-50 rounded-lg p-1"
              resizeMode="contain"
            />
          </View>
          <TouchableOpacity className="bg-primary px-7 py-3 rounded-full">
            <Text className="paragraph-bold text-white">Add to Cart ($16)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuItemDetails;
