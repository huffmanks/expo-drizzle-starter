import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useRef } from "react";
import { FlatList, ScrollView, View } from "react-native";

import { db } from "@/db/drizzle";
import { tag, timer } from "@/db/schema";

import TimerCard from "@/components/timer-card";
import TimerForm from "@/components/timer-form";
import { H1 } from "@/components/ui/typography";

export default function HomeScreen() {
  const { data: timers } = useLiveQuery(db.select().from(timer));
  const { data: tags } = useLiveQuery(db.select().from(tag));

  const scrollRef = useRef<ScrollView>(null);

  return (
    <View className="mx-auto w-full max-w-lg p-6">
      {timers && timers?.length > 0 ? (
        <>
          <ScrollView
            ref={scrollRef}
            contentContainerClassName=""
            showsVerticalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            contentInset={{ top: 12 }}>
            <View className="flex-1 items-center justify-center gap-5 bg-secondary/30 p-6">
              <View className="mb-4 flex flex-col gap-4">
                <H1 className="mb-4">Timers</H1>

                <FlatList
                  data={timers}
                  keyExtractor={(timer) => timer.id.toString()}
                  renderItem={(timer) => <TimerCard {...timer} />}></FlatList>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <View>
          <TimerForm tags={tags} />
        </View>
      )}
    </View>
  );
}
