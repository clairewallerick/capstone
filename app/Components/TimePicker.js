import React, {useEffect, useState} from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

const TimePicker = ({ label, actualTime, onParentCallback, selectedTime }) => { //used on LoginScreen and RegisterScreen and HomeScreen(additional edi on screen)
    const [isSelected, setSelected] = useState(false)
  
    useEffect(() => {
      if(selectedTime.slice(0,5) != actualTime) {
        setSelected(false);
      }
      else{
        setSelected(true);
      }
    }, []);

    const handleChange = (actualTime) => {
      setSelected(true);
      onParentCallback(actualTime);
    }
  
    return (
    <TouchableOpacity
      style={[styles.button, isSelected ? styles.selectedButton : null]} //keep working on this
      onPress={() =>
        handleChange(actualTime)
      }
    >
      <Text style={[styles.text, isSelected ? styles.selectedButton : null]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "32%",
    marginVertical: 7,
  },
  text: {
    color: colors.primary,
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  selectedButton: {
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: 50
  }
});

export default TimePicker;
