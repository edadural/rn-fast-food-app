import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { icons } from "@/constans";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = ({ title, desc, icon }: any) => {
  return (
    <View className="flex flex-row items-center my-3 gap-3">
      <Image
        source={icon}
        className="size-14 rounded-full p-3 bg-orange-50"
        resizeMode="contain"
      />
      <View className="flex flex-col">
        <Text className="text-base text-gray-400">{title}</Text>
        <Text className="text-base font-quicksand-bold text-gray-200">
          {desc}
        </Text>
      </View>
    </View>
  );
};

const Profile = () => {
  const { user, refetch } = useGlobalContext();
  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "Logout Success");
      refetch({});
      router.replace("/sign-in");
    } else {
      Alert.alert("Error", "Logout Failed");
    }
  };

  return (
    <SafeAreaView className="h-full pb-24 px-5 pt-5">
      <ScrollView className="">
        <CustomHeader title="Profile" />
        <View className="flex flex-col gap-y-4">
          <View className="flex items-center justify-center">
            <View>
              <Image
                source={{ uri: user?.avatar }}
                className="size-24 rounded-full"
                resizeMode="contain"
              />
              <Image
                source={icons.pencil}
                className="absolute -bottom-0 right-2 flex items-center justify-center size-6 bg-primary rounded-full p-1"
              />
            </View>
            <View className="flex flex-col w-full bg-white rounded-xl p-3 mt-3">
              <Menu title="Name" desc={user?.name} icon={icons.user} />
              <Menu title="Email" desc={user?.email} icon={icons.envelope} />
              <Menu title="Phone" desc={user?.phone} icon={icons.phone} />
              <Menu
                title="Address"
                desc={user?.address}
                icon={icons.location}
              />
            </View>
          </View>
          <CustomButton
            title="Edit Profile"
            style="bg-orange-100 border border-orange-500"
            textStyle="text-orange-500"
          />
          <CustomButton
            leftIcon={<Image source={icons.logout} className="size-6" />}
            title="Logout"
            style="bg-red-100 border border-red-500 gap-2"
            textStyle="text-red-500"
            onPress={handleLogout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
