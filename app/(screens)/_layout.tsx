import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="memory-game"
          options={{
            title: "Memory Game",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="audio"
          options={{
            title: "Audio",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="medication"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="video-skills"
          options={{
            title: "Manual Skill",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="location"
          options={{
            title: "Location",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="heart"
          options={{
            title: "Heart",
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
