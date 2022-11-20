import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Text from "../Components/Text";
import colors from "../config/colors";

function ApptEvent({
  title,
  date,
  confirmation,
  location,
  apptid,
  time,
  navigation,
}) {
  var apptTime = time;
  time = apptTime.split(":"); // convert to array

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

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
  timeValue += hours >= 12 ? " PM" : " AM"; // get AM/PM

  const apptDate = date.split("-");
  var apptYear = apptDate[0];
  var apptMonth = apptDate[1];
  var apptDay = apptDate[2];

  if (apptMonth == 1) {
    apptMonth = "Jan";
  } else if (apptMonth == 2) {
    apptMonth = "Feb";
  } else if (apptMonth == 3) {
    apptMonth = "Mar";
  } else if (apptMonth == 4) {
    apptMonth = "Apr";
  } else if (apptMonth == 5) {
    apptMonth = "May";
  } else if (apptMonth == 6) {
    apptMonth = "Jun";
  } else if (apptMonth == 7) {
    apptMonth = "Jul";
  } else if (apptMonth == 8) {
    apptMonth = "Aug";
  } else if (apptMonth == 9) {
    apptMonth = "Sep";
  } else if (apptMonth == 10) {
    apptMonth = "Oct";
  } else if (apptMonth == 11) {
    apptMonth = "Nov";
  } else if (apptMonth == 12) {
    apptMonth = "Dec";
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleDateContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.date}>
              {apptMonth} {apptDay}
            </Text>
            <Text style={styles.date}>{timeValue}</Text>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={styles.column}>
            <Text style={styles.location}>Location: {location}</Text>
            <Text style={styles.description}>
              {confirmation === "true" // If it's confirmed, show "status: confirmed", else unconfirmed
                ? "Status: Confirmed"
                : "Status: Unconfirmed"}
            </Text>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("Edit Appointment", { id: apptid })
            }
          >
            <Text style={styles.text}>Edit</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  dateContainer: {
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: colors.light,
    borderRadius: 20,
    padding: 5,
    marginTop: -10,
    width: "30%",
    marginRight: 0,
    marginLeft: "auto",
  },
  column: {
    flexDirection: "column",
  },
  editButton: {
    marginRight: 0,
    marginLeft: "auto",
    color: colors.primary,
    width: "22.5%",
  },
  titleDateContainer: {
    flexDirection: "row",
  },
  date: {
    fontWeight: "600",
  },
  title: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: "500",
  },
  text: {
    color: colors.primary,
    fontWeight: "500",
  },
  location: {
    fontWeight: "600",
  },
  locationContainer: {
    flexDirection: "row",
  },
});

export default ApptEvent;
