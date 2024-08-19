import { memo, useEffect, useState } from "react";
import { View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

import { Timer } from "@/db/schema";
import { formatColonTime, formatLabelTime } from "@/lib/formatTime";
import { Pause, Play, TimerReset, X } from "@/lib/icons";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";

export interface HandlePlayPauseTimerProps {
  timerId: string;
  timeRemaining: number;
  isRunning: boolean;
}

interface TimerCardProps {
  item: Timer;
  handlePlayPauseTimer: ({
    timerId,
    timeRemaining,
    isRunning,
  }: HandlePlayPauseTimerProps) => Promise<void>;
  handleDeleteTimer: (id: string) => Promise<void>;
}

function TimerCard({ item, handlePlayPauseTimer, handleDeleteTimer }: TimerCardProps) {
  const [isPlaying, setIsPlaying] = useState(item.isRunning);
  const [key, setKey] = useState("timer-0");
  const [timeRemaining, setTimeRemaining] = useState(item.timeRemaining);

  const labelTime = formatLabelTime(item.duration);

  useEffect(() => {
    setIsPlaying(item.isRunning);
    setTimeRemaining(item.timeRemaining);
  }, [item.isRunning, item.timeRemaining]);

  async function handleTogglePlayPause() {
    setIsPlaying((prev) => !prev);
    await handlePlayPauseTimer({
      timerId: item.id,
      timeRemaining: item.timeRemaining,
      isRunning: !isPlaying,
    });
  }

  return (
    <>
      <AlertDialog>
        <Card className="mx-auto w-fit">
          <CardHeader>
            <View className="flex-row justify-between gap-4">
              <View>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{labelTime}</CardDescription>
              </View>

              <AlertDialogTrigger asChild>
                <Button
                  variant="secondary"
                  className="aspect-square items-center justify-center rounded-full">
                  <X
                    className="text-foreground"
                    size={24}
                    strokeWidth={1.25}
                  />
                </Button>
              </AlertDialogTrigger>
            </View>
          </CardHeader>
          <CardContent>
            <View className="flex-row justify-between gap-4">
              <CountdownCircleTimer
                key={key}
                isPlaying={isPlaying}
                duration={item.duration}
                initialRemainingTime={timeRemaining}
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
                          className="aspect-square items-center justify-center rounded-full"
                          onPress={() => setKey((prevKey) => prevKey + 1)}>
                          <TimerReset
                            className="text-foreground"
                            size={24}
                            strokeWidth={1.25}
                          />
                        </Button>

                        <Button
                          variant="secondary"
                          className="aspect-square items-center justify-center rounded-full"
                          onPress={handleTogglePlayPause}>
                          {isPlaying ? (
                            <Pause
                              className="text-foreground"
                              size={24}
                              strokeWidth={1.25}
                            />
                          ) : (
                            <Play
                              className="text-foreground"
                              size={24}
                              strokeWidth={1.25}
                            />
                          )}
                        </Button>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          </CardContent>
        </Card>

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
            <AlertDialogAction onPress={() => handleDeleteTimer(item.id)}>
              <Text>Delete</Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default memo(TimerCard);
