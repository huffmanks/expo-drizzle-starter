import { View } from "react-native";

import { cn } from "@/lib/utils";

interface ListItemProps {
  index: number;
  columnNumber: number;
  children: React.ReactNode;
}

export default function ListItem({ index, columnNumber, children }: ListItemProps) {
  return (
    <View
      className={cn("w-[90%]", {
        "ml-2": index % columnNumber === 0,
        "mr-2": index % 1 === 0,
        "mb-2": index % 1 === 0,
        "mt-2": index < columnNumber,
      })}>
      {children}
    </View>
  );
}
