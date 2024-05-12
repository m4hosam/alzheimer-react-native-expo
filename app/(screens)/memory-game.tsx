import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
// import images from "../../constants/images";
import CustomButton from "@/components/customButton";

const Game = () => {
  const [buttonColor, setButtonColor] = useState("bg-blue-300");
  const handlePress = (text: string) => {
    if (text === "green") {
      setButtonColor("bg-green-500");
    } else {
      setButtonColor("bg-red-500");
    }
    setTimeout(() => {
      setButtonColor("bg-blue-300");
    }, 2000);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center items-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={require("../../assets/family/sister.jpg")}
            resizeMode="contain"
            className="w-2/3 mb-10"
          />
          <View className="w-full  flex flex-col gap-y-5">
            <TouchableOpacity
              onPress={() => handlePress("red")}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center ${buttonColor}`}
            >
              <Text className="text-primary font-psemibold text-lg">Dad</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("red")}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center ${buttonColor}`}
            >
              <Text className="text-primary font-psemibold text-lg">
                Grandson
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("green")}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center ${buttonColor}`}
            >
              <Text className="text-primary font-psemibold text-lg">
                Sister
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handlePress("red")}
              activeOpacity={0.7}
              className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center ${buttonColor}`}
            >
              <Text className="text-primary font-psemibold text-lg">Son</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Game;
