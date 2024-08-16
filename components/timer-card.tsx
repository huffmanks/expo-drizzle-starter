import { View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Pause, TimerReset, X } from "@/lib/icons";
import { formatColonTime, formatLabelTime } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface TimerCardProps {
  id: number;
  tagId: number;
  title: string;
  duration: number;
  isRunning: boolean;
}

export default function TimerCard({ id, tagId, title, duration, isRunning }: TimerCardProps) {
  const labelTime = formatLabelTime(duration);
  return (
    <Card className="max-w-fit">
      <CardHeader>
        <View className="flex-row justify-between gap-4">
          <View>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{labelTime}</CardDescription>
          </View>
          <Button
            variant="secondary"
            className="aspect-square items-center justify-center rounded-full">
            <X
              className="text-foreground"
              size={24}
              strokeWidth={1.25}
            />
          </Button>
        </View>
      </CardHeader>
      <CardContent>
        <View className="flex-row justify-between gap-4">
          <CountdownCircleTimer
            isPlaying={isRunning}
            duration={duration}
            colors="#14b8a6"
            strokeWidth={6}
            children={({ remainingTime }) => {
              const colonTime = formatColonTime(remainingTime);
              return (
                <View className="items-center justify-center gap-2">
                  <Text className="text-3xl text-teal-500">{colonTime}</Text>

                  <View className="flex-row items-center gap-2">
                    <Button
                      variant="secondary"
                      className="aspect-square items-center justify-center rounded-full">
                      <TimerReset
                        className="text-foreground"
                        size={24}
                        strokeWidth={1.25}
                      />
                    </Button>

                    <Button
                      variant="secondary"
                      className="aspect-square items-center justify-center rounded-full">
                      <Pause
                        className="text-foreground"
                        size={24}
                        strokeWidth={1.25}
                      />
                    </Button>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </CardContent>
    </Card>
  );
}
