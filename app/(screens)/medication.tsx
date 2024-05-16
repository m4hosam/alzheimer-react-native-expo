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
import { AntDesign } from "@expo/vector-icons";
import RadioGroup from "react-native-radio-buttons-group";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schedulePushNotification } from "./test";

interface Medication {
  drugName: string;
  dose: string;
  hungerStatus: string;
  time: Date;
}
const hungerData = [
  { id: "After Meal", label: "After Meal", value: "After Meal" },
  { id: "Before Meal", label: "Before Meal", value: "Before Meal" },
];

const MedicationScreen = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [isFormVisible, setFormVisibility] = useState(false);
  // Used for floating action button
  const floatingActions = [
    {
      text: "Add Medication",
      icon: <AntDesign name="medicinebox" size={24} color="white" />,
      name: "add_medication",
      position: 1,
    },
  ];

  const [newMed, setNewMed] = useState<Medication>({
    drugName: "",
    dose: "",
    hungerStatus: "",
    time: new Date(),
  });

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("medications", JSON.stringify(medications));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };
  const loadData = async () => {
    try {
      const value = await AsyncStorage.getItem("medications");
      if (value !== null) {
        // console.log(value); // Log the data to the console
        setMedications(JSON.parse(value));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  React.useEffect(() => {
    loadData();
    // Notifications.requestPermissionsAsync();
  }, []);
  React.useEffect(() => {
    saveData();
  }, [medications]);

  const handleChange = (field: keyof Medication, value: any) => {
    setNewMed({
      ...newMed,
      [field]: value,
    });
  };

  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    if (event.type === "set" && selectedTime) {
      if (selectedTime.getTime() < Date.now()) {
        selectedTime.setTime(selectedTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
      }
      console.log(selectedTime.getHours(), selectedTime.getMinutes());
      handleChange("time", selectedTime);
    }
    setDatePickerVisibility(false);
  };

  const handleSubmit = async () => {
    setMedications([...medications, newMed]);
    await schedulePushNotification(newMed.time, newMed.drugName);
    // Reset the medication state
    setNewMed({
      drugName: "",
      dose: "",
      hungerStatus: "",
      time: new Date(),
    });
    setFormVisibility(false);
    // Handle form submission
    console.log(newMed);
  };

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View
          className="w-full flex justify-start items-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* <Text className="mb-24">Med</Text> */}
          {medications.length === 0 && (
            <Text className="text-2xl text-center">No Medications</Text>
          )}
          {medications.map((medication, index) => (
            <View
              key={index}
              className="w-full bg-slate-200 flex my-3 flex-row justify-between items-center p-5 rounded-xl "
            >
              <View className="flex flex-col w-48">
                <Text className="text-2xl text-left">
                  {medication.drugName}
                </Text>
                <Text>{medication.dose}</Text>
                <Text>{medication.hungerStatus}</Text>
              </View>
              {/* Get the Hours:Mintues */}

              <Text className="">
                {`${new Date(medication.time).getHours()}:${new Date(
                  medication.time
                ).getMinutes()}`}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  const newMedications = medications.filter(
                    (_, i) => i !== index
                  );
                  setMedications(newMedications);
                  AsyncStorage.setItem(
                    "medications",
                    JSON.stringify(newMedications)
                  );
                }}
              >
                <AntDesign name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          <FloatingAction
            actions={floatingActions}
            onPressItem={() => {
              setNewMed({
                drugName: "",
                dose: "",
                hungerStatus: "",
                time: new Date(),
              });
              setFormVisibility(true);
            }}
            // onPressItem={() => setFormVisibility(true)}
          />
          <Modal
            visible={isFormVisible}
            animationType="slide"
            transparent={true}
          >
            <View className="h-1/2 top-1/2 bg-white rounded-lg">
              <View className="w-full h-12 rounded-t-xl bg-blue-400 flex flex-row items-center justify-end px-5">
                <TouchableOpacity
                  onPress={() => setFormVisibility(false)}
                  className=""
                  // disabled={isLoading}
                >
                  <AntDesign name="close" size={24} color="blue" />
                </TouchableOpacity>
              </View>
              <View className="px-7 gap-y-7 mt-0">
                <TextInput
                  placeholder="Drug Name"
                  onChangeText={(value) => handleChange("drugName", value)}
                />
                <TextInput
                  placeholder="Dose in mg"
                  onChangeText={(value) => handleChange("dose", value)}
                  keyboardType="numeric"
                  className="mb-3"
                />

                <RadioGroup
                  radioButtons={hungerData}
                  layout="row"
                  onPress={(value) => handleChange("hungerStatus", value)}
                  selectedId={newMed.hungerStatus}
                />
                <View className="w-full flex flex-row items-center justify-between">
                  <Text>
                    Time:{" "}
                    {`${new Date(newMed.time).getHours()}:${new Date(
                      newMed.time
                    ).getMinutes()}`}
                  </Text>
                  <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}
                    className="bg-gray-200 rounded-full p-2 flex flex-row items-center gap-x-3 mb-3 mr-auto ml-auto"
                    // disabled={isLoading}
                  >
                    <Text>Set Time</Text>
                    <AntDesign name="clockcircleo" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                {isDatePickerVisible && (
                  <DateTimePicker
                    value={new Date(Date.now())}
                    mode={"time"}
                    is24Hour={false}
                    display="default"
                    onChange={handleTimeChange}
                    // onChange={(time) =>
                    //   console.log(new Date(time.nativeEvent.timestamp))
                    // }
                  />
                )}
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MedicationScreen;
