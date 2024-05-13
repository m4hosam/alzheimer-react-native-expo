import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Button,
  PixelRatio,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";

const videoSource =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const VideoSkills = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* <Text>Skills</Text> */}
          <View className="items-center">
            <Video
              ref={video}
              style={styles.video}
              source={{
                uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
              }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            />
            <View>
              {/* <Button
                title={status.isPlaying ? "Pause" : "Play"}
                onPress={() =>
                  status.isPlaying
                    ? video.current.pauseAsync()
                    : video.current.playAsync()
                }
              /> */}
            </View>
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
