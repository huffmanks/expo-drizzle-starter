import { useRouter } from "expo-router";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AlarmClock, CheckSquare, Plus } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Text } from "@/components/ui/text";

interface FabProps {
  hasTimers: boolean;
}

export default function Fab({ hasTimers }: FabProps) {
  if (!hasTimers) return null;
  const insets = useSafeAreaInsets();
  const navigate = useRouter();

  const contentInsets = {
    bottom: insets.bottom + 72,
    right: 24,
  };

  return (
    <View className="absolute bottom-12 right-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-16 w-16 rounded-full bg-teal-500">
            <Plus
              className="text-white"
              size={36}
              strokeWidth={2.25}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          insets={contentInsets}
          className="native:w-24 w-24">
          <DropdownMenuItem asChild>
            <Button
              variant="link"
              className="flex flex-row justify-start"
              onPress={() => navigate.push("/add")}>
              <AlarmClock
                className="text-teal-500"
                size={20}
                strokeWidth={1.25}
              />

              <Text>Timer</Text>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Button
              variant="link"
              className="flex flex-row justify-start"
              onPress={() => navigate.push("/tags")}>
              <CheckSquare
                className="text-teal-500"
                size={20}
                strokeWidth={1.25}
              />

              <Text>Tag</Text>
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </View>
  );
}
