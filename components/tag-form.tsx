import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

import { useDatabase } from "@/db/provider";
import { tag } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
});

export default function TagForm() {
  const { db } = useDatabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (db) {
      await db.insert(tag).values(values);
    }
    form.reset();
  }

  return (
    <Form {...form}>
      <View className="mb-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInput
              className="mb-4"
              label="Add a tag"
              placeholder="focus, play"
              autoCapitalize="none"
              {...field}
            />
          )}
        />

        <Button
          onPress={form.handleSubmit(onSubmit)}
          className="bg-teal-500">
          <Text>Submit</Text>
        </Button>
      </View>
    </Form>
  );
}
