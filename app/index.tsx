import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";

import { useMigrationHelper } from "@/db/drizzle";
import { useDatabase } from "@/db/provider";
import { Timer, tag, timer } from "@/db/schema";

import ErrorMessage from "@/components/error-message";
import Fab from "@/components/fab";
import TimerCard, { HandlePlayPauseTimerProps } from "@/components/timer-card";
import TimerForm from "@/components/timer-form";

export default function HomeScreen() {
  const { success, error } = useMigrationHelper();

  if (error) {
    return (
      <ErrorMessage
        message="Migration error:"
        errorMessage={error.message}
      />
    );
  }
  if (!success) {
    return <ErrorMessage message="Migration is in progress..." />;
  }

  return <ScreenContent />;
}
function ScreenContent() {
  const { db } = useDatabase();
  // @ts-expect-error
  const { data: timers, error: timersError } = useLiveQuery(db?.select().from(timer));
  // @ts-expect-error
  const { data: tags, error: tagsError } = useLiveQuery(db?.select().from(tag));

  const ref = useRef(null);
  useScrollToTop(ref);

  const renderItem = useCallback(
    ({ item, index }: { item: Timer; index: number }) => (
      <TimerCard
        key={`${timer.id}-${timers.length}`}
        item={item}
        handlePlayPauseTimer={handlePlayPauseTimer}
        handleDeleteTimer={handleDeleteTimer}
      />
    ),
    []
  );

  if (timersError || tagsError) {
    return <ErrorMessage message="Error loading data." />;
  }

  async function handlePlayPauseTimer({
    timerId,
    timeRemaining,
    isRunning,
  }: HandlePlayPauseTimerProps) {
    try {
      await db?.update(timer).set({ timeRemaining, isRunning }).where(eq(timer.id, timerId));
    } catch (error) {
      console.error("error", error);
    }
  }

  async function handleDeleteTimer(timerId: string) {
    try {
      await db?.delete(timer).where(eq(timer.id, timerId)).execute();
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <View className="relative h-full">
      <ScrollView
        contentContainerClassName="mx-auto w-full max-w-lg p-6"
        showsVerticalScrollIndicator={true}
        className="bg-background"
        automaticallyAdjustContentInsets={false}
        contentInset={{ top: 12 }}>
        <View className="min-h-1">
          <FlashList
            ref={ref}
            className="native:overflow-hidden rounded-t-lg"
            estimatedItemSize={10}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View>
                <TimerForm tags={tags} />
              </View>
            )}
            data={timers}
            renderItem={renderItem}
            keyExtractor={(timer) => `timer-${timer.id}`}
            ItemSeparatorComponent={() => <View className="py-4" />}
          />
        </View>
      </ScrollView>
      <Fab hasTimers={timers && timers.length > 0} />
    </View>
  );
}
