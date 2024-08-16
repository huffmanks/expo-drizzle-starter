import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { View } from "react-native";

import { db } from "@/db/drizzle";
import { tag } from "@/db/schema";

import TagForm from "@/components/tag-form";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";

export default function TagsScreen() {
  const { data: tags } = useLiveQuery(db.select().from(tag));

  return (
    <View className="mx-auto w-full max-w-lg p-6">
      <H2 className="mb-8">Tags</H2>
      <TagForm />

      {tags && tags?.length > 0 && (
        <View className="flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id}>
              <Text>{tag.title}</Text>
            </Badge>
          ))}
        </View>
      )}

      {!tags ||
        (tags?.length < 1 && <Text className="text-muted-foreground">No tags created yet.</Text>)}
    </View>
  );
}
