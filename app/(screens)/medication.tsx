import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Button,
  TextInput,
  Modal,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FloatingAction } from "react-native-floating-action";
// import ActionButton from "react-native-action-button";
// import {
//   Header,
//   Left,
//   Body,
//   Right,
//   Title,
//   Content,
//   List,
//   ListItem,
// } from "native-base";

interface Medication {
  drugName: string;
  dose: string;
  hungerStatus: string;
  time: Date;
}

export default function Medication() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isFormVisible, setFormVisibility] = useState(false);

  const actions = [
    {
      text: "Add Medication",
      // icon: require("./images/ic_accessibility_white.png"),
      name: "add_medication",
      position: 1,
    },
  ];

  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // const handleConfirm = (date: Date) => {
  //   console.warn("A date has been picked: ", date);
  //   hideDatePicker();
  // };

  const [medication, setMedication] = useState<Medication>({
    drugName: "",
    dose: "",
    hungerStatus: "",
    time: new Date(),
  });

  const handleChange = (field: keyof Medication, value: any) => {
    setMedication({
      ...medication,
      [field]: value,
    });
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (selectedTime) {
      if (selectedTime.getTime() < Date.now()) {
        selectedTime.setTime(selectedTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
      }
      handleChange("time", selectedTime);
    }
    setDatePickerVisibility(false);
  };

  const handleSubmit = () => {
    setMedications([...medications, medication]);
    setFormVisibility(false);
    // Handle form submission
    console.log(medication);
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
          {medications.map((medication, index) => (
            <Text key={index}>{medication.drugName}</Text>
          ))}
          <FloatingAction
            actions={actions}
            onPressItem={() => setFormVisibility(true)}
          />
          <Modal visible={isFormVisible} animationType="slide">
            <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
              <TextInput
                placeholder="Drug Name"
                onChangeText={(value) => handleChange("drugName", value)}
              />
              <TextInput
                placeholder="Dose"
                onChangeText={(value) => handleChange("dose", value)}
                keyboardType="numeric"
              />
              <TextInput
                placeholder="Hunger Status"
                onChangeText={(value) => handleChange("hungerStatus", value)}
              />
              <Button
                title="Set Time"
                onPress={() => setDatePickerVisibility(true)}
              />
              {isDatePickerVisible && (
                <DateTimePicker
                  value={new Date(Date.now())}
                  mode={"time"}
                  is24Hour={false}
                  display="default"
                  onChange={handleTimeChange}
                  // onChange={(time) => console.log(new Date(time.nativeEvent.timestamp))}
                />
              )}
              <Button title="Submit" onPress={handleSubmit} />
              <Button title="Close" onPress={() => setFormVisibility(false)} />
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
