import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ImageBackground,
  Alert
} from "react-native";
import Dropdown from "../Components/Dropdown";
import Button from "../Components/Button";
import apptApi from "../api/appointment";
import useApi from "../hooks/useApi";
import ActivityIndicator from "../Components/ActivityIndicator";
import { useIsFocused } from "@react-navigation/native";

export default function EditAppointmentScreen({ navigation, route }) {
  const getApptsApi = useApi(apptApi.getOneAppointment); //route from this screen to the api folder calling the get, useApi expects a function when it is called that it will eventually run when request() is used

  const [test, setTest] = useState(""); //test selected by user when they booked, changes when they edit it
  const [date, setDate] = useState(""); //date and time selected by user when they booked, is not editable by user
  const [location, setLocation] = useState(""); //location selected by user when they booked, is not editable by user

  const isFocused = useIsFocused();
  isFocused
    ? useEffect(() => {
        navigation.getParent().setOptions({ headerShown: false });
      })
    : useEffect(() => {
        navigation.getParent().setOptions({ headerShown: true });
      });
  //^^connects page to parent page (user profile) that links to this one

  const handleCallBackTest = (childData) => {
    //parent function, dropdown passes selected test back to this function through a prop
    setTest(childData);
  };

  //////////////data1 and data2 had to be repeated here and bookappointment sadly because this page doesn't directly connect to book appointment obviously, didn't have time to put these in database////////////////////////

  const data1 = [
    //need flat list of tests to compare test on appt to this list and find value for dropdown
    { label: "HIV", value: 1 },
    { label: "STI", value: 2 },
    { label: "HIV & STI", value: 3 },
    { label: "STI-Self Test", value: 4 },
  ];

  const data2 =
    //need flat list of times to compare time on appt to this list and find 12hr time we want to display instead of 24hr
    [
      { label: "08:30 AM", value: 1, actualTime: "08:30" },
      { label: "09:00 AM", value: 2, actualTime: "09:00" },
      { label: "09:30 AM", value: 3, actualTime: "09:30" },
      { label: "10:00 AM", value: 4, actualTime: "10:00" },
      { label: "10:30 AM", value: 5, actualTime: "10:30" },
      { label: "11:00 AM", value: 6, actualTime: "11:00" },
      { label: "11:30 AM", value: 7, actualTime: "11:30" },
      { label: "12:00 PM", value: 8, actualTime: "12:00" },
      { label: "12:30 PM", value: 9, actualTime: "12:30" },
      { label: "01:00 PM", value: 10, actualTime: "13:00" },
      { label: "01:30 PM", value: 11, actualTime: "13:30" },
      { label: "02:00 PM", value: 12, actualTime: "14:00" },
      { label: "02:30 PM", value: 13, actualTime: "14:30" },
      { label: "03:00 PM", value: 14, actualTime: "15:00" },
      { label: "03:30 PM", value: 15, actualTime: "15:30" },
      { label: "04:00 PM", value: 16, actualTime: "16:00" },
      { label: "04:30 PM", value: 17, actualTime: "16:30" },
      { label: "05:00 PM", value: 18, actualTime: "17:00" },
      { label: "05:30 PM", value: 19, actualTime: "17:30" },
      { label: "06:00 PM", value: 20, actualTime: "18:00" },
      { label: "06:30 PM", value: 21, actualTime: "18:30" },
    ];

  const handleSubmit = () => {
    //sends updated appt info to the put
    apptApi.editAppointment(route.params.id, test);
    successAlert();
  };

  const successAlert = () => {
    Alert.alert("Success!", "Your appointment has been edited.", [
      { text: "OK", onPress: () => navigation.navigate("Five Spot") },
    ]);
  };

  const getValue = () => {
    //function to compare test data to database data
    let value = null;
    data1.forEach(function (testType) {
      if (testType.label == test.toString()) {
        //compares flat list to test name set on state in the useEffect
        value = testType.value; //if matches, returns the 'ID' of the test on the flat list so that dropdown knows which to display
      }
    });
    return value;
  };

  const getDate = () => {
    //function to compare time from database to time list, showing 24hr vs 12hr time, and then return full date and time together
    let displayTime = "";
    data2.forEach(function (time) {
      if (time.actualTime == date.slice(11, 16).toString()) {
        //compares flat list of times to time set on state in useEffect, time is the second half of the state variable
        displayTime = time.label;
      }
    });
    return date.slice(0, 10) + " " + displayTime; //returns first half of state variable(date) and correct time for display
  };

  useEffect(() => {
    //CALLED AUTOMATICALLY WHEN PAGE LOADS
    const getData = async () => {
      let appointmentData = await getApptsApi.request(route.params.id); //calls request method mentioned above on useApi, pass any arguments that you want to pass in the getOneAppointment passed to useApi above
      setTest(appointmentData.data[0].test_type);
      setDate(appointmentData.data[0].appt_date);
      setLocation(appointmentData.data[0].appt_location);
    };
    getData();
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../assets/textured-background.webp")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView style={{ top: "18%", height: '100%' }}>
          <ActivityIndicator visible={getApptsApi.loading} />
          <View>
            {getApptsApi.error && (
              <>
                <Text>Couldn't retrieve the appointment.</Text>
                <Button title="Retry" onPress={getApptsApi.request} />
              </>
            )}
          </View>
          <View>
            <View style={styles.container}>
              <View style={styles.inputsContainer}>
                <View style={styles.inputs}>
                  <View>
                    <Text style={styles.text}>Test</Text>
                    {/* value prop on the dropdown below calls function to return ID of test so that IF statement on dropdown component displays the correct test on page load, 
                basically hard codes component to display test since it wasn't set up for this concept, just for selecting */}
                    <Dropdown
                      data={data1}
                      placeholder={"Select test..."}
                      onParentCallback={handleCallBackTest}
                      value={getValue()}
                    ></Dropdown>
                  </View>

                  <Text style={styles.text}>Location</Text>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.textContainer}>
                      <Text>{location}</Text>
                    </View>
                  </View>

                  <Text style={styles.text}>Date/Time</Text>
                  <View style={{ alignItems: "center" }}>
                    <View style={styles.textContainer}>
                      <Text>{getDate()}</Text>
                    </View>
                  </View>
                  <Button
                    title={"SUBMIT"}
                    buttonStyle={styles.button}
                    onPress={handleSubmit}
                  ></Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 50,
    marginRight: 50,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
    padding: 7,
  },
  inputs: {
    marginTop: 20,
    padding: 15,
    width: 350,
    borderRadius: 25,
    backgroundColor: "#dee2e6",
  },
  inputsContainer: {
    alignItems: "center",
    marginBottom: 150,
  },
  textContainer: {
    height: 30,
    paddingHorizontal: 8,
    padding: 5,
    width: 290,
    marginTop: 10,
    marginBottom: 10,
  },
});
