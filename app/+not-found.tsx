import { Text } from "@/components/ui/text";
import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View className="m-6">
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text className="text-rose-600 underline underline-offset-4">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
