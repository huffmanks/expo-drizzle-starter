import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue", headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name="home"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name="group"
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="timers"
        options={{
          title: "Timers",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={28}
              name="clock-o"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
