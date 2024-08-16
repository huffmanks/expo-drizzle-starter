import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { View } from "react-native";

import { db } from "@/db/drizzle";
import { tag } from "@/db/schema";

import TimerForm from "@/components/timer-form";

export default function AddScreen() {
  const { data: tags } = useLiveQuery(db.select().from(tag));

  return (
    <View className="mx-auto w-full max-w-lg p-6">
      <TimerForm tags={tags} />
    </View>
  );
}
