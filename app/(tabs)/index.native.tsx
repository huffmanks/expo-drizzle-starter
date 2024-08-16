import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRef } from "react";
import { ScrollView, View } from "react-native";

import { db } from "@/db/drizzle";
import { timer } from "@/db/schema";

import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function HomeScreen() {
  const { data: timers } = useLiveQuery(db.select().from(timer));

  const scrollRef = useRef<ScrollView>(null);

  return (
    <>
      {timers && timers?.length > 0 ? (
        <ScrollView
          ref={scrollRef}
          contentContainerClassName="p-6 mx-auto w-full max-w-xl"
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 12 }}>
          <View className="flex-1 items-center justify-center gap-5 bg-secondary/30 p-6">
            <View className="mb-4 flex flex-col gap-4">
              <H1 className="mb-4">Timers</H1>
              <Text>{JSON.stringify(timers, null, 2)}</Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View className="p-6">
          <Text className="text-muted-foreground">No timers created yet.</Text>
        </View>
      )}
    </>
  );
}
