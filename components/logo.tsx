import { View } from "react-native";

import { Text } from "@/components/ui/text";
import { AlarmClock } from "@/lib/icons";

export default function Logo() {
  return (
    <View className="flex-row items-center justify-center gap-2">
      <View className="aspect-square items-center justify-center">
        <AlarmClock
          className="text-teal-500"
          size={28}
          strokeWidth={1.25}
        />
      </View>
      <Text className="text-xl">Timers</Text>
    </View>
  );
}
