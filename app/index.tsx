import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as React from "react";
import { ScrollView, View } from "react-native";

import { expoDb, useMigrationHelper } from "@/db/drizzle";
import { useDatabase } from "@/db/provider";
import { Group, Timer, group, timer } from "@/db/schema";

import GroupForm from "@/components/group-form";
import TimerForm from "@/components/timer-form";
import { Text } from "@/components/ui/text";

export default function Screen() {
  const [groups, setGroups] = React.useState<Group[] | null>(null);
  const [timers, setTimers] = React.useState<Timer[] | null>(null);

  const scrollRef = React.useRef<ScrollView>(null);
  const { db } = useDatabase();
  const { success, error } = useMigrationHelper();
  useDrizzleStudio(expoDb);

  React.useEffect(() => {
    const fetchData = async () => {
      if (db) {
        const allGroups = db.select().from(group).all();
        const allTimers = db.select().from(timer).all();

        setGroups(allGroups);
        setTimers(allTimers);
      }
    };

    fetchData();
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
    <ScrollView
      ref={scrollRef}
      contentContainerClassName="p-6 mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}>
      <View className="flex-1 items-center justify-center gap-5 bg-secondary/30 p-6">
        <View className="mb-4 flex flex-row gap-4">
          <Text>Groups</Text>
          {groups &&
            groups.length > 0 &&
            groups.map((group) => <Text key={group.id}>{group.title}</Text>)}
        </View>
        <View className="mb-4 flex flex-row gap-4">
          <Text>Timers</Text>
          {timers &&
            timers.length > 0 &&
            timers.map((timer) => <Text key={timer.id}>{timer.title}</Text>)}
        </View>

        <GroupForm />
        {groups && groups.length > 0 && <TimerForm groups={groups} />}
      </View>
    </ScrollView>
  );
}
