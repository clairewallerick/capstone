import React from "react";
import { StyleSheet, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "./Text";

function FactCard({ fact, date, spot }) {
  const factDate = date.split("-");
  var factYear = factDate[0];
  var factMonth = factDate[1];
  var factDay = factDate[2];

  if (factMonth == 1) {
    factMonth = "Jan";
  } else if (factMonth == 2) {
    factMonth = "Feb";
  } else if (factMonth == 3) {
    factMonth = "Mar";
  } else if (factMonth == 4) {
    factMonth = "Apr";
  } else if (factMonth == 5) {
    factMonth = "May";
  } else if (factMonth == 6) {
    factMonth = "Jun";
  } else if (factMonth == 7) {
    factMonth = "Jul";
  } else if (factMonth == 8) {
    factMonth = "Aug";
  } else if (factMonth == 9) {
    factMonth = "Sep";
  } else if (factMonth == 10) {
    factMonth = "Oct";
  } else if (factMonth == 11) {
    factMonth = "Nov";
  } else if (factMonth == 12) {
    factMonth = "Dec";
  }
  return (
    <View style={styles(spot).stuffText}>
      <Text style={styles().fact}>{fact}</Text>
      <View style={styles().dateContainer}>
        {fact.includes("tests in Alabama") ? (
          <>
            <Text style={styles().lastUpdated}>Last Updated:</Text>
            <Text style={styles().date}>
              {factDay} {factMonth} {factYear}
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={colors.medium}
                style={styles().icon}
              />
            </Text>
          </>
        ) : fact.includes("negative vs positive") ? (
          <>
            <Text style={styles().lastUpdated}>Last Updated:</Text>
            <Text style={styles().date}>
              {factDay} {factMonth} {factYear}
              <MaterialCommunityIcons
                name="calendar"
                size={20}
                color={colors.medium}
              />
            </Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

const styles = (spot) =>
  StyleSheet.create({
    date: {
      marginLeft: "auto",
      marginRight: 0,
      fontWeight: "600",
    },
    dateContainer: {
      flexDirection: "row",
    },
    lastUpdated: {
      fontWeight: "600",
    },
    fact: {
      marginBottom: 10,
    },
    stuffText: {
      backgroundColor: spot % 2 == 0 ? "#d4b4b4" : colors.grey,
      borderRadius: 5,
      width: "100%",
      padding: 10,
      marginVertical: 10,
    },
  });

export default FactCard;
