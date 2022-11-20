import React from "react";
import { useFormikContext } from "formik";
import { StyleSheet, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import TextInput from "../TextInput";
import ErrorMessage from "./ErrorMessage";
import { useTogglePasswordVisibility } from "../../hooks/handlePasswordVisibility";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";

function AppFormField({ name, width, ...otherProps }) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={(text) => setFieldValue(name, text)}
          value={values[name]}
          width={width}
          secureTextEntry={passwordVisibility}
          {...otherProps}
        />
      </View>
      <TouchableOpacity
        style={styles.passContainer}
        onPress={handlePasswordVisibility}
      >
        <Text style={styles.showPassText}>Show Password </Text>
        <MaterialCommunityIcons
          name={rightIcon}
          size={20}
          color={colors.medium}
        />
      </TouchableOpacity>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    // backgroundColor: colors.light,
    width: "100%",
    borderRadius: 25,
    // flexDirection: "row",
    // alignItems: "center",
  },
  passContainer: {
    flexDirection: "row",
    alignContent: "center",
    marginLeft: 5,
    marginVertical: 10,
  },
  showPassText: {
    color: colors.medium,
    fontSize: 15,
  },
});

export default AppFormField;
