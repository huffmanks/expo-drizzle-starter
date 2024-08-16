import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { View } from "react-native";

import { db } from "@/db/drizzle";
import { group } from "@/db/schema";

import GroupForm from "@/components/group-form";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";

export default function GroupsScreen() {
  const { data: groups } = useLiveQuery(db.select().from(group));

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
