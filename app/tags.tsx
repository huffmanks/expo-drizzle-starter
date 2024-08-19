import { useScrollToTop } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useCallback, useRef } from "react";
import { ScrollView, View } from "react-native";

import { useDatabase } from "@/db/provider";
import { Tag, tag } from "@/db/schema";

import ErrorMessage from "@/components/error-message";
import ListItem from "@/components/list-item";
import TagForm from "@/components/tag-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H2, H3 } from "@/components/ui/typography";

export default function TagsScreen() {
  const { db } = useDatabase();
  // @ts-expect-error
  const { data: tags, error } = useLiveQuery(db?.select().from(tag));

  const ref = useRef(null);
  useScrollToTop(ref);

  const columnNumber = 2;

  const renderItem = useCallback(
    ({ item, index }: { item: Tag; index: number }) => (
      <ListItem
        index={index}
        columnNumber={columnNumber}>
        <AlertDialogTrigger asChild>
          <Button>
            <Text>{item.title}</Text>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your timer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={() => handleDeleteTag(item.id)}>
              <Text>Delete</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </ListItem>
    ),
    []
  );

  if (error) {
    return <ErrorMessage message="Error loading data." />;
  }

  async function handleDeleteTag(tagId: string) {
    try {
      await db?.delete(tag).where(eq(tag.id, tagId)).execute();
    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <ScrollView
      contentContainerClassName="mx-auto w-full max-w-lg p-6"
      showsVerticalScrollIndicator={true}
      className="bg-background"
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}>
      <H2 className="mb-8">Tags</H2>
      <TagForm />

      <AlertDialog>
        <View className="min-h-1">
          <FlashList
            ref={ref}
            className="native:overflow-hidden rounded-t-lg"
            estimatedItemSize={2}
            horizontal={false}
            numColumns={columnNumber}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <H3 className="mb-2">Current tags</H3>}
            ListEmptyComponent={() => (
              <Text className="text-muted-foreground">No tags created yet.</Text>
            )}
            data={tags}
            renderItem={renderItem}
            keyExtractor={(item) => `tag-${item.id}`}
          />
        </View>
      </AlertDialog>
    </ScrollView>
  );
}
