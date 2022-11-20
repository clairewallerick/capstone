import React from "react";
import { StyleSheet, Linking } from "react-native";
import Text from "../Components/Text";
import colors from "../config/colors";

function Disclaimer({ disclaimer, style }) {
  return <Text style={[styles.disclaimer, style]}>{disclaimer}</Text>;
}

const styles = StyleSheet.create({
  disclaimer: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "500",
    backgroundColor: colors.light,
    textAlign: "center",
  },
});

export default Disclaimer;
