import React, { useState, useEffect } from "react";
import { Button, Text, ScrollView, Dimensions, View } from "react-native";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
};

const App = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [originalCoordinates, setOriginalCoordinates] =
    useState<Coordinates | null>(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setCoordinates(location.coords);
    setOriginalCoordinates(location.coords);
  };

  const getRandomLocation = () => {
    if (!coordinates) return;

    // 500 meters in degrees
    const distanceInDegrees = 500 / 111000;

    // Random angle
    const theta = Math.random() * (2 * Math.PI);

    // New coordinates
    const newLatitude =
      coordinates.latitude + distanceInDegrees * Math.cos(theta);
    const newLongitude =
      coordinates.longitude + distanceInDegrees * Math.sin(theta);

    setCoordinates({ latitude: newLatitude, longitude: newLongitude });
  };

  useEffect(() => {
    getLocation();

    // Start monitoring location changes
    const watchId = Location.watchPositionAsync(
      { distanceInterval: 500 },
      (location) => {
        if (!originalCoordinates) return;

        const distance = getDistance(
          originalCoordinates.latitude,
          originalCoordinates.longitude,
          location.coords.latitude,
          location.coords.longitude
        );

        if (distance > 500) {
          alert("You have moved more than 500m from your original location!");
        }
      }
    );

    // Clean up the location watcher on unmount
    return () => {
      watchId.then((subscription) => subscription.remove());
    };
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {coordinates ? (
            <>
              <Text>Latitude: {coordinates.latitude}</Text>
              <Text>Longitude: {coordinates.longitude}</Text>
              <Button title="Get New Location" onPress={getRandomLocation} />
            </>
          ) : (
            <Text>Getting location...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
