import { useEffect, useState } from "react";
import { View } from "react-native";

import { useDatabase } from "@/db/provider";
import { Tag } from "@/db/schema";

import TimerForm from "@/components/timer-form";

export default function AddScreen() {
  const [tags, setTags] = useState<Tag[] | null>(null);

  const { db, getTags } = useDatabase();

  useEffect(() => {
    if (db) {
      getTags().then((items) => setTags(items));
    }
    return () => {
      setTags(null);
    };
  }, [db]);
  return (
    <View className="mx-auto w-full max-w-lg p-6">
      <TimerForm tags={tags} />
    </View>
  );
}
