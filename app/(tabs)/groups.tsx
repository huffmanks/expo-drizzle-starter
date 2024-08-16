import { useEffect, useState } from "react";
import { View } from "react-native";

import { useDatabase } from "@/db/provider";
import { Group } from "@/db/schema";

import GroupForm from "@/components/group-form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function GroupsScreen() {
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
      <H1 className="mb-4">Groups</H1>
      <View className="mb-8 flex flex-col gap-4">
        {groups && groups?.length > 0 ? (
          groups.map((group) => <Text key={group.id}>{group.title}</Text>)
        ) : (
          <Text className="text-muted-foreground">No groups created yet.</Text>
        )}
      </View>
      <GroupForm />
    </View>
  );
}
