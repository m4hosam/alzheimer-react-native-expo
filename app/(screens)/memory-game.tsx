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
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      image: require("../../assets/family/sister.jpg"),
      options: ["Mom", "Granddaughter", "Niece", "Sister"],
      answer: "Sister",
    },
    {
      image: require("../../assets/family/grandson.jpg"),
      options: ["Son", "Grandson", "Brother", "Nephew"],
      answer: "Grandson",
    },
    {
      image: require("../../assets/family/granddaughter.jpg"),
      options: ["Niece", "Granddaughter", "Brother", "Sister"],
      answer: "Granddaughter",
    },
    {
      image: require("../../assets/family/son.jpg"),
      options: ["Dad", "Grandson", "Son", "Brother"],
      answer: "Son",
    },
    // ... other questions
  ];

  const handlePress = (text: string, index: number) => {
    let newButtonColor = { ...buttonColor };
    if (text === questions[currentQuestion].answer) {
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

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setButtonColor({});
    }
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setButtonColor({});
    }
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
            source={questions[currentQuestion].image}
            resizeMode="contain"
            className="w-2/3 mb-10"
          />
          <View className="w-full  flex flex-col gap-y-5">
            {questions[currentQuestion].options.map((text, index) => (
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

            <View className="w-full flex flex-row justify-between">
              <TouchableOpacity
                onPress={handlePrevious}
                activeOpacity={0.7}
                className="w-28 bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center bg-orange-300 "
              >
                <Text className="text-primary font-psemibold text-lg">
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleNext}
                activeOpacity={0.7}
                className="w-28 bg-secondary rounded-xl min-h-[50px] flex flex-row justify-center items-center bg-orange-300 "
              >
                <Text className="text-primary font-psemibold text-lg">
                  Next
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Game;
