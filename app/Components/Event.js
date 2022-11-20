import React from "react";
import { StyleSheet, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import number2text from "number2text";

import Text from "../Components/Text";
import colors from "../config/colors";

function Event({ title, date, time, location, description, spot }) {
  var eventTime = time;
  time = eventTime.split(":"); // convert to array

  // fetch
  var hours = Number(time[0]);
  var minutes = Number(time[1]);

  // calculate
  var timeValue;

  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  // This is used so the clock icon on the event will show the actual time!
  var hoursString = number2text(timeValue, "English").toLowerCase();

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += hours >= 12 ? " PM" : " AM"; // get AM/PM

  const eventDate = date.split("-");
  var eventYear = eventDate[0];
  var eventMonth = eventDate[1];
  var eventDay = eventDate[2];

  if (eventMonth == 1) {
    eventMonth = "Jan";
  } else if (eventMonth == 2) {
    eventMonth = "Feb";
  } else if (eventMonth == 3) {
    eventMonth = "Mar";
  } else if (eventMonth == 4) {
    eventMonth = "Apr";
  } else if (eventMonth == 5) {
    eventMonth = "May";
  } else if (eventMonth == 6) {
    eventMonth = "Jun";
  } else if (eventMonth == 7) {
    eventMonth = "Jul";
  } else if (eventMonth == 8) {
    eventMonth = "Aug";
  } else if (eventMonth == 9) {
    eventMonth = "Sep";
  } else if (eventMonth == 10) {
    eventMonth = "Oct";
  } else if (eventMonth == 11) {
    eventMonth = "Nov";
  } else if (eventMonth == 12) {
    eventMonth = "Dec";
  }
  return (
    <>
      <View style={styles(spot).container}>
        <View style={styles().titleDateContainer}>
          <View>
            <Text style={styles().title}>{title}</Text>
            <Text>
              <MaterialCommunityIcons
                name={`clock-time-${hoursString}-outline`}
                size={20}
                color={colors.medium}
                style={styles().icon}
              />
              {timeValue}
            </Text>
          </View>
          <View style={styles(spot).dateContainer}>
            <Text style={styles().date}>{eventDay}</Text>
            <Text style={styles().date}>{eventMonth}</Text>
          </View>
        </View>
        <View style={styles().locationContainer}>
          <Text style={styles().location}>Location: </Text>
          <Text>{location}</Text>
        </View>
        <Text style={styles().description}>{description}</Text>
      </View>
    </>
  );
}

const styles = (spot) =>
  StyleSheet.create({
    container: {
      backgroundColor: spot % 2 == 0 ? colors.grey : "#d4b4b4",
      marginVertical: 10,
      borderRadius: 5,
      padding: 15,
      width: "100%",
      // alignItems: "center",
    },
    titleDateContainer: {
      flexDirection: "row",
      marginBottom: 10,
    },
    date: {
      fontWeight: "600",
      // textAlign: "center",
    },
    dateContainer: {
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: colors.light,
      borderRadius: 20,
      padding: 5,
      marginTop: -10,
      width: "20%",
      marginRight: 0,
      marginLeft: "auto",
    },
    title: {
      fontSize: 20,
      color: colors.primary,
      fontWeight: "500",
    },
    location: {
      fontWeight: "500",
      marginBottom: 10,
    },
    locationContainer: {
      flexDirection: "row",
    },
  });

export default Event;
