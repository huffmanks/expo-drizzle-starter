// import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { useMigrationHelper } from "@/db/drizzle";
import { useDatabase } from "@/db/provider";
import { Timer } from "@/db/schema";

import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function HomeScreen() {
  const [timers, setTimers] = useState<Timer[] | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const { db, getTimers } = useDatabase();
  const { success, error } = useMigrationHelper();
  // useDrizzleStudio(expoDb);

  useEffect(() => {
    if (!db) return;

    getTimers().then((items) => setTimers(items));

    return () => {
      setTimers(null);
    };
  }, [db]);

  if (error) {
    return (
      <View className="flex-1 gap-5 bg-secondary/30 p-6">
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View className="flex-1 gap-5 bg-secondary/30 p-6">
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

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
              {timers.map((timer) => (
                <Text>{JSON.stringify(timers, null, 2)}</Text>
              ))}
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
