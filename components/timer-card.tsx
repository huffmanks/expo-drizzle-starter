import { View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Timer } from "@/db/schema";
import { formatColonTime, formatLabelTime } from "@/lib/formatTime";
import { Pause, TimerReset, X } from "@/lib/icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

interface TimerCardProps {
  item: Timer;
  handleDeleteTimer: (id: string) => Promise<void>;
}

export default function TimerCard({ item, handleDeleteTimer }: TimerCardProps) {
  const labelTime = formatLabelTime(item.duration);
  return (
    <Card className="mx-auto w-fit">
      <CardHeader>
        <View className="flex-row justify-between gap-4">
          <View>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{labelTime}</CardDescription>
          </View>
          <Button
            variant="secondary"
            className="aspect-square items-center justify-center rounded-full"
            onPress={() => handleDeleteTimer(item.id)}>
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
            isPlaying={item.isRunning}
            duration={item.duration}
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
