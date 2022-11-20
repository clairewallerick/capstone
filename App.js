import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, Button, View, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import SearchEducationScreen from "./app/Screens/SearchEducationScreen";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/Screens/LoginScreen";
import AuthContext from "./app/auth/context";
import HomeScreen from "./app/Screens/HomeScreen";
import BookAppointmentScreen from "./app/Screens/BookAppointmentScreen";
import EditAppointmentScreen from "./app/Screens/EditAppointmentScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FullEducationScreen from "./app/Screens/FullEducationScreen";
import colors from "./app/config/colors";
import RegisterScreen from "./app/Screens/RegisterScreen";
import PageTitle from "./app/Components/PageTitle";
import ProfileScreen from "./app/Screens/ProfileScreen";
import authStorage from "./app/auth/storage";
import userinfo from "./app/api/userinfo";

const Drawer = createDrawerNavigator();

// Allows splash screen to display
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = useState(null); // this creates user and set user to be passed into the authcontext
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Restoring the user from previous session so they don't have to keep logging in
        const user = await authStorage.getUser();
        if (user) setUser(user);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        // Hides the splash screen to display the app
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    //Authcontext provider is neccessary for the use of authcontext passing in user and setuser will aloow it to be
    //used throughout the app
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            drawerActiveBackgroundColor: colors.primary,
            drawerActiveTintColor: colors.white,
            display: "none",
            headerStyle: { backgroundColor: "transparent" },
          }}
          initialRouteName="Five Spot"
        >
          {
            //the two drawers below are outside the check for a logged in user so they are always available
          }
          <Drawer.Screen
            options={{
              headerTitle: (props) => <PageTitle>Five Spot</PageTitle>,
              headerTransparent: true,
              drawerIcon: ({ size }) => (
                <Image
                  source={require("./app/assets/home.png")}
                  style={{ height: size, width: size }}
                />
              ),
            }}
            name="Five Spot"
            component={HomeScreen}
          />
          {
            //for a screen with sub screens you need to create a seperate stack nav refer to education stack screen structure
          }
          <Drawer.Screen
            options={{
              headerTitle: (props) => (
                <PageTitle>Deez Facts are Nuts</PageTitle>
              ),
              headerTransparent: true,
              drawerIcon: ({ size }) => (
                <Image
                  source={require("./app/assets/book-alt.png")}
                  style={{ height: size, width: size }}
                />
              ),
            }}
            name="Deez Facts are Nuts"
            component={EducationStackScreen}
          />
          {
            //the check below is to see if the user is logged in
          }
          {user != null ? (
            <>
              {
                //these screens show when a user is logged in
              }
              <Drawer.Screen
                options={{
                  headerTitle: (props) => (
                    <PageTitle>Book an Appointment</PageTitle>
                  ),
                  headerTransparent: true,
                  drawerIcon: ({ size }) => (
                    <Image
                      source={require("./app/assets/calendar.png")}
                      style={{ height: size, width: size }}
                    />
                  ),
                  unmountOnBlur: true, //makes it so the fields and selections aren't still there when you go back to the page later
                }}
                name="Book an Appointment"
                component={BookAppointmentScreen}
              />
              <Drawer.Screen
                options={{
                  headerTitle: (props) => <PageTitle>Profile</PageTitle>,
                  headerTransparent: true,
                  drawerIcon: ({ size }) => (
                    <Image
                      source={require("./app/assets/user.png")}
                      style={{ height: size, width: size }}
                    />
                  ),
                  unmountOnBlur: true,
                }}
                name="Profile"
                component={ProfileStackScreen}
              />
            </>
          ) : (
            <>
              {
                //these screens show when a user in logged out
                // to make a new one simply copy and paste  and edit pagetitle and name DO NOT CHANGE COMPONET FROM LOGINSCREEN
                //all components are login screen except for register to prevent unauthorized access
              }
              <Drawer.Screen
                options={{
                  headerTitle: (props) => <PageTitle>Login</PageTitle>,
                  headerTransparent: true,
                  drawerIcon: ({ size }) => (
                    <Image
                      source={require("./app/assets/calendar.png")}
                      style={{ height: size, width: size }}
                    />
                  ),
                  unmountOnBlur: true,
                }}
                name="Book an Appointment"
                component={LoginScreen}
              />
              <Drawer.Screen
                options={{
                  headerTitle: (props) => <PageTitle>Login</PageTitle>,
                  headerTransparent: true,
                  drawerIcon: ({ size }) => (
                    <Image
                      source={require("./app/assets/avatar.png")}
                      style={{ height: size, width: size }}
                    />
                  ),
                  unmountOnBlur: true,
                }}
                name="Login"
                component={LoginScreen}
              />
              <Drawer.Screen
                options={{
                  headerTitle: (props) => <PageTitle>Register</PageTitle>,
                  headerTransparent: true,
                  drawerIcon: ({ size }) => (
                    <Image
                      source={require("./app/assets/avatar.png")}
                      style={{ height: size, width: size }}
                    />
                  ),
                  unmountOnBlur: true,
                }}
                name="Register"
                component={RegisterScreen}
              />
            </>
          )}
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

// this is a sub stack navigator as the education has a search screen with a sub screen of full education
function EducationStackScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SearchEducationScreen">
      {
        //ensure the top screen has header shown to false or you will have 2 headers
      }
      <Stack.Screen
        options={{ headerShown: false }}
        name="SearchEducationScreen"
        component={SearchEducationScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: (props) => <PageTitle>Deez Facts are Nuts</PageTitle>,
          headerTransparent: true,
          headerStyle: { margin: 20 },
        }}
        name="FullEducationScreen"
        component={FullEducationScreen}
      />
    </Stack.Navigator>
  );
}

// this is a sub stack navigator as the profile screen has a sub screen to edit appointment
function ProfileStackScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="ProfileScreen">
      {
        //ensure the top screen has header shown to false or you will have 2 headers
      }
      <Stack.Screen
        options={{ headerShown: false, unmountOnBlur: true }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: (props) => <PageTitle>Edit Appointment</PageTitle>,
          headerTransparent: true,
          headerStyle: { margin: 20 },
          unmountOnBlur: true,
        }}
        name="Edit Appointment"
        component={EditAppointmentScreen}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    headerTitle: "",
    headerTransparent: true,
  },
});
