import { useEffect, useState } from "react";
import { View } from "react-native";

import { useDatabase } from "@/db/provider";
import { Group } from "@/db/schema";

import TimerForm from "@/components/timer-form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function TimersScreen() {
  const [groups, setGroups] = useState<Group[] | null>(null);

  const { db, getGroups } = useDatabase();

  useEffect(() => {
    if (db) {
      getGroups().then((items) => setGroups(items));
    }
    return () => {
      setGroups(null);
    };
  }, [db]);
  return (
    <View className="mx-auto w-full max-w-lg p-6">
      <H1 className="mb-4">Timers</H1>
      <View className="mb-8 flex flex-col gap-4">
        {groups && groups?.length > 0 ? (
          <TimerForm groups={groups} />
        ) : (
          <Text className="text-muted-foreground">Create a group first.</Text>
        )}
      </View>
    </View>
  );
}
