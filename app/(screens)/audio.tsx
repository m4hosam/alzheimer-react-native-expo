import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  StyleSheet,
} from "react-native";

const Audio = () => {
  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text>Audio</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Audio;

const styles = StyleSheet.create({});
