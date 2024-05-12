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
  const [buttonColor, setButtonColor] = useState<{ [key: number]: string }>({});

  const handlePress = (text: string, index: number) => {
    let newButtonColor = { ...buttonColor };
    if (text === "Sister") {
      newButtonColor[index] = "bg-green-500";
    } else {
      newButtonColor[index] = "bg-red-500";
    }
    setButtonColor(newButtonColor);
    setTimeout(() => {
      newButtonColor[index] = "bg-blue-300";
      setButtonColor(newButtonColor);
    }, 10);
  };

  const buttonTexts = ["Dad", "Mom", "Brother", "Sister"];

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
            {buttonTexts.map((text, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handlePress(text, index)}
                activeOpacity={0.7}
                className={`bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center ${
                  buttonColor[index] || "bg-blue-300"
                }`}
              >
                <Text className="text-primary font-psemibold text-lg">
                  {text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Game;
