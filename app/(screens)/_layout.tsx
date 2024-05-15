import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="memory-game"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="audio"
          options={{
            headerShown: false,
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
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="test"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
