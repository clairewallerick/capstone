import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import * as Yup from "yup";

import ActivityIndicator from "../Components/ActivityIndicator";
import authApi from "../api/auth";
import colors from "../config/colors";
import Dropdown from "../Components/Dropdown";
import ErrorMessage from "../Components/forms/ErrorMessage";
import Form from "../Components/forms/Form";
import FormField from "../Components/forms/FormField";
import PasswordField from "../Components/forms/PasswordField";
import Screen from "../Components/Screen";
import SubmitButton from "../Components/forms/SubmitButton";
import useApi from "../hooks/useApi";
import useAuth from "../auth/useAuth";
import usersApi from "../api/users";

// These are regex expressions for form validation
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const nameRegExp = /^(?!.{126,})([\w+]{3,}\s+[\w+]{3,} ?)$/;

const dateRegExp =
  /(0[1-9]|1[012])[- \-.](0[1-9]|[12][0-9]|3[01])[- \-.](19|20)\d\d/;

const passRegExp = /(?=.*[a-z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

// Same as login screen, validates every field
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      passRegExp,
      "Must have 8 letters, contain a number, and a special character"
    )
    .required()
    .min(4)
    .label("Password"),
  phone_number: Yup.string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits")
    .matches(phoneRegExp, "Phone number is not valid")
    .required()
    .label("Phone Number"),
  email: Yup.string().required().email().label("Email"),
  userName: Yup.string()
    .matches(nameRegExp, "Enter first and last name (3 character min. each)")
    .required()
    .label("Name"),
  birthdate: Yup.string()
    .matches(dateRegExp, "Must be in MM.DD.YYYY format (no spaces)")
    .required()
    .label("Birthdate"),
});

const data1 = [
  { label: "University of Alabama (UA)", value: "UA" },
  { label: "Stillman (ST)", value: "ST" },
  { label: "Shelton (SH)", value: "SH" },
  { label: "Safe Center (SC)", value: "SC" },
  { label: "Tuscaloosa Resident (CM)", value: "CM" },
];

function RegisterScreen({ navigation }) {
  const registerApi = useApi(usersApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();
  const [locationError, setLocationError] = useState();
  const [location, setLocation] = useState();

  const handleCallBackLocation = (childData) => {
    // Sets location on dropdown value change
    var data = childData.split("(");
    setLocationError("");
    setLocation(data[1].substring(0, 2));
  };

  const handleSubmit = async (userInfo) => {
    if (location === undefined) {
      // Don't know how else to get this to display and error for now so this is where it is ;)
      setLocationError("Location is a required field");
    }

    if (locationError == "") {
      // Sends user information to the register API (users.js in api folder)
      const result = await registerApi.request(
        userInfo.password,
        userInfo.phone_number,
        userInfo.email,
        userInfo.userName,
        userInfo.birthdate,
        location
      );

      // The following are possible error messages that will be sent from the backend upon a failed registration
      if (result.data.message == "Email already exists in database") {
        setError("This email already has an account.");
        return;
      }
      if (
        result.data.message == "Could not save user to DB" ||
        result.data.message == "Could not hash password. User Not created" ||
        result.data.message == "Could not create unique ID"
      ) {
        setError("An issue has occurred. Try again later.");
        return;
      }
      if (!result.ok) {
        if (result.data) setError(result.data.error);
        else {
          setError("An unexpected error occurred.");
          console.log(result);
        }
        navigation.navigate("Five Spot");
        return;
      }

      // Once registration is complete, it will login the user
      const { data: authToken } = await loginApi.request(
        userInfo.email,
        userInfo.password
      );
      auth.logIn(authToken);
    }
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/textured-background.webp")}
        resizeMode="cover"
        style={styles.image}
      >
        <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
        <Screen style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Form
                initialValues={{
                  password: "",
                  phone_number: "",
                  email: "",
                  userName: "",
                  birthdate: "",
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <ErrorMessage error={error} visible={error} />
                <FormField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="email"
                  keyboardType="email-address"
                  name="email"
                  placeholder="Email"
                  textContentType="emailAddress"
                  returnKeyType="done"
                />
                <FormField
                  autoCorrect={false}
                  icon="account"
                  name="userName"
                  placeholder="Name"
                  returnKeyType="done"
                />
                <FormField
                  autoCorrect={false}
                  icon="calendar"
                  name="birthdate"
                  placeholder="Birthdate: MM.DD.YYYY"
                  keyboardType="numeric"
                  returnKeyType="done"
                />
                <Dropdown
                  icon={"map"}
                  data={data1}
                  onParentCallback={handleCallBackLocation}
                  placeholder={"Select location..."}
                ></Dropdown>
                <ErrorMessage error={locationError} visible={locationError} />
                <FormField
                  autoCorrect={false}
                  icon="phone"
                  name="phone_number"
                  placeholder="Phone Number"
                  keyboardType="number-pad"
                  returnKeyType="done"
                />
                {/* This field has the "view password thing" */}
                <PasswordField
                  autoCapitalize="none"
                  autoCorrect={false}
                  icon="lock"
                  name="password"
                  placeholder="Password"
                  returnKeyType="done"
                />
                <SubmitButton title="Register" />
              </Form>
              <View style={styles.haveAccountContainer}>
                <Button
                  color={colors.primary}
                  style={styles.signIn}
                  onPress={() => navigation.navigate("Login")}
                  title="Have an Account? Sign In"
                ></Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Screen>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    padding: 10,
    top: "5%",
  },
  title: {
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    textAlign: "left",
    width: 230,
    fontSize: 16,
    color: colors.light,
  },
  haveAccountContainer: {
    flexDirection: "row",
    marginVertical: "4%",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: "5%",
    width: "90%",
  },
  fiveId: {
    color: colors.medium,
    fontSize: 18,
    textAlign: "center",
    padding: 20,
  },
});

export default RegisterScreen;
