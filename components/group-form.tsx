import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import * as z from "zod";

import { useDatabase } from "@/db/provider";
import { group } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
});

export default function GroupForm() {
  const { db } = useDatabase();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (db) {
      await db.insert(group).values(values);
    }
    console.log(JSON.stringify(values, null, 2));
    form.reset();
  }

  return (
    <Form {...form}>
      <H2 className="mb-4">Group Form</H2>
      <View className="mb-8 gap-7">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormInput
              label="Title"
              placeholder="Name this thing"
              description="You can change this later."
              autoCapitalize="none"
              {...field}
            />
          )}
        />

        <Button onPress={form.handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Button>
        <View>
          <Button
            variant="ghost"
            onPress={() => {
              form.clearErrors();
            }}>
            <Text>Clear errors</Text>
          </Button>
          <Button
            variant="ghost"
            onPress={() => {
              form.reset();
            }}>
            <Text>Clear form values</Text>
          </Button>
        </View>
      </View>
    </Form>
  );
}
