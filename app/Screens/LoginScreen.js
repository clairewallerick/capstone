import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Button,
} from "react-native";
import * as Yup from "yup";

import Screen from "../Components/Screen";
import ErrorMessage from "../Components/forms/ErrorMessage";
import Form from "../Components/forms/Form";
import FormField from "../Components/forms/FormField";
import SubmitButton from "../Components/forms/SubmitButton";
import Text from "../Components/Text";

import authApi from "../api/auth";
import useAuth from "../auth/useAuth";
import colors from "../config/colors";

// This will validate the email and password fields ensuring they enter valid values
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen({ navigation }) {
  const [loginFailed, setLoginFailed] = useState(false);
  // Stores the auth token once successful login
  const auth = useAuth();
  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    // Messages sent from backend if login is unsuccessful
    if (
      result.data.message == "Email is invalid" ||
      result.data.message == "Password is invalid"
    ) {
      return setLoginFailed(true);
    }
    if (!result.ok) return setLoginFailed(true);
    await auth.logIn(result.data, email);
    setLoginFailed(false);
    setLoginCompleted(true);
  };
  return (
    <ImageBackground
      source={require("../assets/textured-background.webp")}
      resizeMode="cover"
      style={styles.image}
    >
      <Screen style={styles.container}>
        {/* This allows you to scroll to the currently selected field */}
        <KeyboardAvoidingView behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              style={styles.logo}
              source={require("../assets/FiveSpot.png")}
            />
            <Text style={styles.subtitle}>Five Spot by Five Horizons</Text>

            <Form
              initialValues={{ email: "", password: "" }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <ErrorMessage
                error="Invalid email and/or password."
                visible={loginFailed}
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="email"
                keyboardType="email-address"
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <FormField
                autoCapitalize="none"
                autoCorrect={false}
                icon="lock"
                name="password"
                placeholder="Password"
                secureTextEntry
                textContentType="password"
              />
              <SubmitButton title="LOGIN" />
            </Form>
            <View style={styles.signUpContainer}>
              {/* <Button
          color={colors.primary}
          onPress={() => navigation.navigate()}
          title="Forgot Password?"
        ></Button> */}
              <Button
                color={colors.primary}
                onPress={() => navigation.navigate("Register")}
                title="Sign Up"
              ></Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Screen>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    top: "20%",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    margin: "2%",
  },
  logo: {
    width: 225,
    height: 150,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  subtitle: {
    alignSelf: "center",
    marginBottom: 50,
    color: colors.medium,
    fontSize: 20,
  },
  signIn: {
    paddingLeft: 15,
    fontSize: 25,
    marginBottom: 15,
    color: colors.medium,
    fontWeight: "800",
  },
  signUpContainer: {
    flexDirection: "row",
    marginTop: 25,
    width: "100%",
    justifyContent: "space-evenly",
  },
});

export default LoginScreen;
