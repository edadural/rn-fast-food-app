import { images } from "@/constans";
import React from "react";
import { Image, Text, View } from "react-native";

const ItemCard = ({ name, image }: { name: string; image: any }) => {
  return (
    <View className="flex flex-col w-28 items-center bg-orange-950 rounded-2xl mr-5">
      <View className="w-28 h-24 border-2 border-gray-50 bg-white justify-center rounded-2xl">
        <Image source={image} className="w-full" resizeMode="contain" />
      </View>

      <View className="flex flex-row w-full bg-orange-950 justify-between items-center p-3 rounded-b-2xl">
        <Text className="text-white text-sm">{name}</Text>
        <Image source={images.plus} className="size-5" resizeMode="contain" />
      </View>
    </View>
  );
};

export default ItemCard;
