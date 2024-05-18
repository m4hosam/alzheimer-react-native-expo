import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";

const videoSource = require("../../assets/videos/door.mp4");

const VideoSkills = () => {
  const video = React.useRef(null);
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className="w-full flex justify-center px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          {/* <Text>Skills</Text> */}
          <View className="items-center">
            <Video
              ref={video}
              style={styles.video}
              source={videoSource}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VideoSkills;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
