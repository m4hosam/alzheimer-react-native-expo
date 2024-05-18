import React from "react";
import { View, Text, StyleSheet } from "react-native";

const generateData = () => {
  const data = [];
  let heartRate = 100;
  let date = new Date("2024-05-05T20:56:12");

  for (let i = 0; i < 10; i++) {
    heartRate += Math.floor(Math.random() * 5 - 2);
    date.setSeconds(date.getSeconds() + Math.floor(Math.random() * 5 - 2));
    data.push({ heartRate, time: date.toLocaleString() });
  }

  return data;
};

const HeartRateRow = ({
  heartRate,
  time,
}: {
  heartRate: number;
  time: string;
}) => (
  <View style={styles.row}>
    <Text>Heart rate: {heartRate} BPM</Text>
    <Text>Time: {time}</Text>
  </View>
);

const HeartRateScreen = () => {
  const data = generateData();

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <HeartRateRow key={index} {...item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default HeartRateScreen;
