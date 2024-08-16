// import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";

import { useMigrationHelper } from "@/db/drizzle";
import { useDatabase } from "@/db/provider";
import { Tag, Timer } from "@/db/schema";

import TimerCard from "@/components/timer-card";
import TimerForm from "@/components/timer-form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function HomeScreen() {
  const [tags, setTags] = useState<Tag[] | null>(null);
  const [timers, setTimers] = useState<Timer[] | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const { db, getTags, getTimers } = useDatabase();
  const { success, error } = useMigrationHelper();
  // useDrizzleStudio(expoDb);

  useEffect(() => {
    if (!db) return;

    getTags().then((items) => setTags(items));
    getTimers().then((items) => setTimers(items));

    return () => {
      setTags(null);
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

  const tt = {
    title: "test",
    id: 1,
    tagId: 0,
    duration: 6340,
    isRunning: true,
  };

  return (
    <View className="mx-auto w-full max-w-lg p-6">
      <TimerCard timer={tt} />
      {timers && timers?.length > 0 ? (
        <ScrollView
          ref={scrollRef}
          contentContainerClassName=""
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 12 }}>
          <View className="flex-1 items-center justify-center gap-5 bg-secondary/30 p-6">
            <View className="mb-4 flex flex-col gap-4">
              <H1 className="mb-4">Timers</H1>
              {timers.map((timer) => (
                <Text key={timer.id}>{JSON.stringify(timers, null, 2)}</Text>
              ))}
            </View>
          </View>
        </ScrollView>
      ) : (
        <View>
          <TimerForm tags={tags} />
        </View>
      )}
    </View>
  );
}
