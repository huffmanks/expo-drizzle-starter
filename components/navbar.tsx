import { Link } from "expo-router";
import { View } from "react-native";

import { AlarmClock, Plus } from "@/lib/icons";

import { ThemeToggle } from "@/components/theme-toggle";
import { Text } from "@/components/ui/text";

export default function Navbar() {
  return (
    <View className="w-full flex-row items-center justify-between gap-4 px-5">
      <View className="flex-row items-center justify-center gap-4">
        <View className="flex-row items-center justify-center gap-2">
          <View className="aspect-square items-center justify-center">
            <AlarmClock
              className="text-teal-500"
              size={28}
              strokeWidth={1.25}
            />
          </View>
          <Link href="/">
            <Text className="text-xl">Timers</Text>
          </Link>
        </View>

        <Link href="/tags">
          <Text className="text-xl">Tags</Text>
        </Link>
        <Link href="/add">
          <View className="aspect-square items-center justify-center rounded-full bg-muted p-1.5">
            <Plus
              className="text-teal-500"
              size={20}
              strokeWidth={1.75}
            />
          </View>
        </Link>
      </View>
      <View className="w-[63px]">
        <ThemeToggle />
      </View>
    </View>
  );
}
