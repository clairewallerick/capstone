import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  ImageBackground,
  Linking,
} from "react-native";
import colors from "../config/colors";
import Subtitle from "../Components/Subtitle";
import Dropdown from "../Components/Dropdown";
import Button from "../Components/Button";
import apptApi from "../api/appointment";
import CalendarPicker from "react-native-calendar-picker";
import TimePicker from "../Components/TimePicker";
import authStorage from "../auth/storage";
import Disclaimer from "../Components/Disclaimer";

//////////////data1 and data2 had to be repeated here and editappointment sadly because this page doesn't directly connect to edit appointment obviously, didn't have time to put these in database////////////////////////

const data1 = [
  //flat data for types of test they can book appt for
  { label: "HIV", value: 1 },
  { label: "STI", value: 2 },
  { label: "HIV & STI", value: 3 },
  { label: "STI - Self Test", value: 4 },
];

const data2 =
  //flat list for times that are available appt times (5spot hours)
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

const data3 = [
  //flat list of locations for testing
  { label: "The Annex", value: 1 },
  { label: "Five Spot", value: 2 },
  { label: "Safe Center", value: 3 },
  { label: "UA Campus", value: 4 },
  { label: "New Heights", value: 5 },
  { label: "At Home", value: 6 },
];

export default function BookAppointmentScreen({ navigation }) {
  const [dataList, setDataList] = useState([]); //mapped time picker components
  const [isPicked, setIsPicked] = useState(false); //updates when date is picked to change styling to display list of times
  const [pickedTime, setTime] = useState(""); //time selected for appointment
  const [pickedDate, setDate] = useState(""); //date selected for appointment
  const [pickedTest, setTest] = useState(""); //test selected for appointment
  const [pickedLocation, setLocation] = useState(""); //location selected for appointment
  const [user, setUser] = useState();

  useEffect(() => {
    //CALLED AUTOMATICALLY WHEN PAGE LOADS
    const getData = async () => {
      const userid = await authStorage.getUser();
      setUser(userid);
      let dataList = await loadData();
      setDataList(dataList);
    };
    getData();
  }, [pickedTime]); //called again when pickedTime is updated, this is how the datalist refills after handleCallBackTime runs

  const successAlert = () => {
    Alert.alert("Success!", "Your appointment has been booked. View your upcoming appointment on your Profile!", [
      { text: "OK", onPress: () => navigation.navigate("Five Spot") },
    ]);
  };

  const tryAgainAlert = () => {
    Alert.alert("Oops!", "There was an error, please try again.", [
      { text: "OK" },
    ]);
  };

  const loadData = async () => {
    //renders list of times as separate components
    let dataList = data2.map((time) => (
      <TimePicker
        label={time.label}
        actualTime={time.actualTime}
        onParentCallback={handleCallBackTime}
        key={time.value}
        selectedTime={pickedTime}
      />
    ));
    return dataList;
  };

  const handleCallBackTime = (childData) => {
    //parent function, time picker passes selected time back to this function through a prop
    let time = childData + ":00"; //adds 0s so it is in the correct format for the database HH:MM:SS
    setTime(time);
    setDataList([]); //sets time list to a blank array so that when it refills in the useEffect it forces the map function to re-run and update
    //>>the components (long story had to do it so that only one would be highlighted at a time when they pick a time and then another one) >>
  };

  const onDateChange = (date) => {
    //passes date when user selects one from the calendar picker component
    setDate(date.toISOString().slice(0, 10)); //had to slice date because the format from the component included a time I didn't need
    setIsPicked(true);
  };

  const handleCallBackTest = (childData) => {
    //parent function, dropdown passes selected time back to this function through a prop
    setTest(childData);
  };

  const handleCallBackLocation = (childData) => {
    //parent function, dropdown passes selected time back to this function through a prop
    setLocation(childData);
  };

  const handleSubmit = async () => {
    //combines date and time together since database only has one column and then passes to post
    if (
      pickedTest != "" &&
      pickedLocation != "" &&
      pickedDate != "" &&
      pickedTime != ""
    ) {
      let datetime = pickedDate + " " + pickedTime;
      apptApi.addAppointment(user.sub, pickedTest, pickedLocation, datetime);
      successAlert();
    } else {
      tryAgainAlert();
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/textured-background.webp")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView style={{ top: "18%" }} showsVerticalScrollIndicator={false}>
          <View>
            <View style={styles.container}>
              <View style={styles.disclaimerContainer}>
                <Disclaimer
                  disclaimer={
                    "For same-day appointments, please call 205-759-8472"
                  }
                ></Disclaimer>
              </View>
              <View style={styles.inputsContainer}>
                <View style={styles.inputs}>
                  <View>
                    <Text style={styles.text}>Test</Text>
                    <Dropdown
                      data={data1}
                      placeholder={"Select test..."}
                      onParentCallback={handleCallBackTest}
                    ></Dropdown>
                  </View>
                  <View>
                    <Text style={styles.text}>Location</Text>
                    <Dropdown
                      data={data3}
                      placeholder={"Select location..."}
                      onParentCallback={handleCallBackLocation}
                    ></Dropdown>
                  </View>
                  <View style={styles.calendarContainer}>
                    {/* https://www.npmjs.com/package/react-native-calendar-picker */}
                    <CalendarPicker
                      startFromMonday={false}
                      minDate={
                        new Date(new Date().valueOf() + 1000 * 3600 * 24)
                      } //gets tomorrow's date
                      maxDate={new Date(2050, 12, 31)}
                      disabledDates={(date) => {
                        if (date.weekday() == 0 || date.weekday() == 6) {
                          //removes weekends
                          return true;
                        }
                        return false;
                      }}
                      weekdays={["Mon", "Tue", "Wed", "Thur", "Fri"]}
                      months={[
                        "January",
                        "Febraury",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                        "December",
                      ]}
                      previousTitle="Previous"
                      previousTitleStyle={{
                        marginLeft: "20%",
                        marginRight: "-5%",
                      }}
                      nextTitleStyle={{ marginRight: "20%" }}
                      nextTitle="Next"
                      todayBackgroundColor="#e6ffe6"
                      selectedDayColor={colors.primary}
                      selectedDayTextColor="#000000"
                      // scaleFactor={400}
                      textStyle={{
                        color: "#000000",
                      }}
                      onDateChange={onDateChange}
                    />
                  </View>
                  <View>
                    <View
                      style={[
                        styles.timeList,
                        !isPicked ? styles.noDisplay : null,
                      ]}
                    >
                      {dataList}
                    </View>
                  </View>
                  <Button
                    title={"BOOK"}
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

// Why are there so many containers you may ask? I don't know. Ask Anne

const styles = StyleSheet.create({
  container: {
    marginLeft: 25,
    marginRight: 25,
    justifyContent: "center",
  },
  calendarContainer: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: colors.light,
    padding: 25,
    borderRadius: 25,
  },
  disclaimerContainer: {
    color: colors.primary,
    backgroundColor: colors.light,
    borderRadius: 25,
    padding: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    marginTop: 10,
    padding: 7,
  },
  image: {
    flex: 1,
  },
  inputs: {
    marginTop: 20,
    width: "100%",
    borderRadius: 25,
  },
  inputsContainer: {
    alignItems: "center",
    marginBottom: 300,
  },
  timeList: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
    backgroundColor: colors.light,
    padding: 25,
    borderRadius: 25,
  },
  noDisplay: {
    display: "none",
  },
  disclaimerText: {
    color: colors.primary,
    fontSize: 12,
  },
});
