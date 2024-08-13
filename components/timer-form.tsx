import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as z from "zod";

import { useDatabase } from "@/db/provider";
import { Group, timer } from "@/db/schema";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormSelect, FormSwitch } from "@/components/ui/form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  groupId: z.object(
    { value: z.string(), label: z.string() },
    {
      invalid_type_error: "Please select a group.",
    }
  ),
  duration: z.string().min(1, {
    message: "You must have a duration for the timer.",
  }),
  isRunning: z.boolean(),
});

export default function TimerForm({ groups }: { groups: Group[] }) {
  const [selectTriggerWidth, setSelectTriggerWidth] = React.useState(0);

  const { db } = useDatabase();
  const insets = useSafeAreaInsets();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      isRunning: false,
    },
  });

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (db) {
      await db.insert(timer).values({
        ...values,
        groupId: Number(values.groupId.value),
        duration: Number(values.duration),
      });
    }
    console.log(JSON.stringify(values, null, 2));
    form.reset();
  }

  const transformedGroups = groups.map((group) => ({
    value: group.id.toString(),
    label: group.title,
  }));

  return (
    <Form {...form}>
      <H2 className="mb-4">Timer Form</H2>
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

        <FormField
          control={form.control}
          name="groupId"
          render={({ field }) => (
            <FormSelect
              label="Group"
              description="Pick a group for the timer."
              {...field}>
              <SelectTrigger
                onLayout={(ev) => {
                  setSelectTriggerWidth(ev.nativeEvent.layout.width);
                }}>
                <SelectValue
                  className={cn(
                    "native:text-lg text-sm",
                    field.value ? "text-foreground" : "text-muted-foreground"
                  )}
                  placeholder="Select a group."
                />
              </SelectTrigger>
              <SelectContent
                insets={contentInsets}
                style={{ width: selectTriggerWidth }}>
                <SelectGroup>
                  {transformedGroups.map((group) => (
                    <SelectItem
                      key={group.value}
                      label={group.label}
                      value={group.value}>
                      <Text>{group.label}</Text>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </FormSelect>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormInput
              label="Duration"
              placeholder="60"
              description="Enter a duration for the timer."
              {...field}
            />
          )}
        />

        <FormField
          control={form.control}
          name="isRunning"
          render={({ field }) => (
            <FormSwitch
              label="Start now"
              description="Do you want to start the timer now?"
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
