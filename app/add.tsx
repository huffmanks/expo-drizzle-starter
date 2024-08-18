import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { ScrollView } from "react-native";

import { useDatabase } from "@/db/provider";
import { tag } from "@/db/schema";

import TimerForm from "@/components/timer-form";

export default function AddScreen() {
  const { db } = useDatabase();
  // @ts-expect-error
  const { data: tags } = useLiveQuery(db?.select().from(tag));

  return (
    <ScrollView
      contentContainerClassName="mx-auto w-full max-w-lg p-6"
      showsVerticalScrollIndicator={true}
      className="bg-background"
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}>
      <TimerForm tags={tags} />
    </ScrollView>
  );
}
