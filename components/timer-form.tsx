import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as z from "zod";

import { useDatabase } from "@/db/provider";
import { Tag, tag, timer } from "@/db/schema";
import { handleDurationDisplay, parseTimeInput } from "@/lib/formatTime";
import { Delete, Play } from "@/lib/icons";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormItem, FormSelect } from "@/components/ui/form";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { H2 } from "@/components/ui/typography";

const formSchema = z.object({
  title: z.string().optional(),
  tagId: z.object({ value: z.string(), label: z.string() }),
  duration: z
    .string()
    .min(1, {
      message: "You must have a duration for the timer.",
    })
    .max(6, {
      message: "Max of 6 digits for the timer.",
    }),
});

interface TimerFormProps {
  tags: Tag[] | null;
}

export default function TimerForm({ tags }: TimerFormProps) {
  const [selectTriggerWidth, setSelectTriggerWidth] = useState(0);

  const { db } = useDatabase();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Untitled",
      tagId: {
        value: "",
        label: "",
      },
      duration: "",
    },
  });

  useEffect(() => {
    form.setValue("tagId.value", tags?.[0]?.id ?? "Untitled");
    form.setValue("tagId.label", tags?.[0]?.title ?? "Untitled");
  }, [tags]);

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const duration = parseTimeInput(values.duration);

      let tagId = values.tagId.value;

      if (tagId === "Untitled") {
        const newTag = await db?.insert(tag).values({ title: "Untitled" }).returning();

        if (!newTag) throw Error;
        tagId = newTag[0].id;
      }

      await db
        ?.insert(timer)
        .values({
          ...values,
          tagId,
          duration,
          timeRemaining: duration,
        })
        .returning();

      router.replace("/");
    } catch (e) {
      console.error(e);
    }

    form.reset();
  }

  const durationExists = form.watch("duration") !== "";

  const transformedTags =
    tags && tags.length > 0
      ? tags.map((tag) => ({
          value: tag.id,
          label: tag.title,
        }))
      : [
          {
            value: "Untitled",
            label: "Untitled",
          },
        ];

  return (
    <Form {...form}>
      <H2 className="mb-8">Create timer</H2>
      <View className="mb-8">
        <View className="mb-6 gap-7">
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
                value={field.value ?? "Untitled"}
              />
            )}
          />

          <FormField
            control={form.control}
            name="tagId"
            render={({ field }) => (
              <FormSelect
                label="Tag"
                description="Pick a tag for the timer."
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
                    placeholder="Select a tag."
                  />
                </SelectTrigger>
                <SelectContent
                  insets={contentInsets}
                  style={{ width: selectTriggerWidth }}>
                  <SelectGroup>
                    {transformedTags.map((tag) => (
                      <SelectItem
                        key={tag.value}
                        label={tag.label}
                        value={tag.value}>
                        <Text>{tag.label}</Text>
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
              <FormItem>
                <FormInput
                  aria-hidden={true}
                  label="Duration"
                  readOnly
                  {...field}
                  style={{ marginTop: -8 }}
                  className="invisible m-0 hidden h-0 select-none p-0 opacity-0"
                />
                <View className="rounded-md bg-muted px-6 py-4 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0">
                  <Text className="text-xl">{handleDurationDisplay(field.value)}</Text>
                </View>
                <View className="mx-auto max-w-sm flex-row flex-wrap gap-4 pt-6">
                  {Array.from({ length: 9 }, (_, i) => (
                    <Button
                      key={i + 1}
                      className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-600"
                      onPress={() => field.onChange((field.value || "") + (i + 1).toString())}>
                      <Text className="text-4xl text-foreground">{i + 1}</Text>
                    </Button>
                  ))}
                  <Button
                    className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-600"
                    onPress={() => field.onChange((field.value || "") + "00")}>
                    <Text className="text-4xl text-foreground">00</Text>
                  </Button>
                  <Button
                    className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-600"
                    onPress={() => field.onChange((field.value || "") + "0")}>
                    <Text className="text-4xl text-foreground">0</Text>
                  </Button>
                  <Button
                    className="h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-teal-800"
                    onPress={() => field.onChange(field.value?.slice(0, -1))}>
                    <Delete
                      className="mr-0.5 text-foreground"
                      size={36}
                      strokeWidth={1.75}
                    />
                  </Button>
                </View>
              </FormItem>
            )}
          />
        </View>

        {durationExists && (
          <View className="mx-auto mb-8">
            <Button
              className="size-24 items-center justify-center rounded-full bg-teal-400"
              onPress={form.handleSubmit(onSubmit)}>
              <Play
                className="text-foreground"
                size={36}
                strokeWidth={1.75}
              />
            </Button>
          </View>
        )}
      </View>
    </Form>
  );
}
