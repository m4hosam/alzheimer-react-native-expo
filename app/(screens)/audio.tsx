import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { Audio } from "expo-av";
import { AntDesign, Entypo } from "@expo/vector-icons";

const Tracks = [
  {
    id: 0,
    image: require("../../assets/images/calm.jpg"),
    track: require("../../assets/audio/calm.mp3"),
  },
  {
    id: 1,
    image: require("../../assets/images/relax.jpg"),
    track: require("../../assets/audio/relax.mp3"),
  },
  {
    id: 2,
    image: require("../../assets/images/nature.jpg"),
    track: require("../../assets/audio/nature.mp3"),
  },
];

const AudioScreen = () => {
  // const [Loaded, SetLoaded] = useState(false);
  const [Loading, SetLoading] = useState(false);
  const [CurrentSong, SetCurrentSong] = useState(Tracks[0]);
  const sound = React.useRef(new Audio.Sound());

  useEffect(() => {
    LoadAudio();

    return () => Unload();
  }, [CurrentSong]);

  const Unload = () => {
    sound.current.unloadAsync();
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PauseAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === true) {
          sound.current.pauseAsync();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoadAudio = async () => {
    // SetLoaded(false);
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          CurrentSong.track,
          {},
          true
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          console.log("Error in Loading Audio");
        } else {
          SetLoading(false);
          PlayAudio();
          // SetLoaded(true);
        }
      } catch (error) {
        console.log(error);
        SetLoading(false);
      }
    } else {
      SetLoading(false);
    }
  };

  const NextSong = () => {
    if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
      SetCurrentSong(Tracks[0]);
    } else {
      SetCurrentSong(Tracks[CurrentSong.id + 1]);
    }
  };

  const PrevSong = () => {
    if (CurrentSong.id === 0) {
      SetCurrentSong(Tracks[Tracks.length - 1]);
    } else {
      SetCurrentSong(Tracks[CurrentSong.id - 1]);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className="w-full flex justify-center  px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 200,
          }}
        >
          <View className="w-full items-center">
            {Loading === true ? (
              <ActivityIndicator size={"small"} color={"red"} />
            ) : (
              <>
                <Image
                  source={CurrentSong.image}
                  className="rounded-xl mb-10"
                  style={{ width: 300, height: 300 }}
                />
                {/* <Text>Currently Playing : {CurrentSong.id}</Text> */}
                <View className="w-full flex-row justify-between items-center px-10">
                  <TouchableOpacity
                    onPress={PrevSong}
                    className=""
                    // disabled={isLoading}
                  >
                    <AntDesign name="stepbackward" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={PauseAudio}
                    activeOpacity={0.7}
                    className=""
                    // disabled={isLoading}
                  >
                    <Entypo name="controller-paus" size={28} color="gray" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={PlayAudio}
                    activeOpacity={0.7}
                    className=""
                    // disabled={isLoading}
                  >
                    <AntDesign name="caretright" size={24} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={NextSong}
                    className="bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center"
                    // disabled={isLoading}
                  >
                    <AntDesign name="stepforward" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  AudioPLayer: {
    width: "100%",
    height: 50,
    alignItems: "center",
  },
});
