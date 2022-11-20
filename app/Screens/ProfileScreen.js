import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  Button,
  RefreshControl,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import ActivityIndicator from "../Components/ActivityIndicator";
import apptsApi from "../api/appointment";
import ApptEvent from "../Components/Appt";
import authStorage from "../auth/storage";
import colors from "../config/colors";
import useAuth from "../auth/useAuth";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ProfileScreen({ navigation }) {
  //necessary setup for the appointment calls
  const auth = useAuth();
  const getpastApptsApi = useApi(apptsApi.getpastAppointments);
  const getfutureApptsApi = useApi(apptsApi.getfutureAppointments);
  const [pastAppts, setPastAppts] = useState([]);
  const [futureAppts, setFutureAppts] = useState([]);
  const [user, setUser] = useState();
  const [userEmail, setUserEmail] = useState();
  const [refreshing, setRefreshing] = useState(false); // This is for the pull refresh

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(async () => {
      var user = await authStorage.getUser();
      setUser(user.fiveid);
      let pastApptsList = await getpastApptsApi.request(user.sub);
      let futureApptsList = await getfutureApptsApi.request(user.sub);
      setPastAppts(pastApptsList.data);
      setFutureAppts(futureApptsList.data);
      setRefreshing(false);
    });
  }, []);

  //this makes the actual request to the database, you must pass variables through request not through the function ex (getAppt)
  useEffect(() => {
    const getData = async () => {
      const userid = await authStorage.getUser(); // Gets user from token in storage
      setUser(userid.fiveid);
      setUserEmail(userid.username);
      let pastApptsList = await getpastApptsApi.request(userid.sub);
      let futureApptsList = await getfutureApptsApi.request(userid.sub);
      setPastAppts(pastApptsList.data);
      setFutureAppts(futureApptsList.data);
    };
    getData();
  }, []);

  //this is neccessary to reshow the drawerheader after exiting a sub screen from the stack
  const isFocused = useIsFocused();
  isFocused
    ? useEffect(() => {
        navigation.getParent().setOptions({ headerShown: true });
      })
    : useEffect(() => {
        navigation.getParent().setOptions({ headerShown: false });
      });

  //this is used to create a list of react components from a array of data
  // must have a unique key identifier or a warning will be thrown

  const pastapptslist = pastAppts.map((appt) => (
    <ApptEvent
      key={appt.appt_id}
      apptid={appt.appt_id}
      title={
        appt.test_type == "STI"
          ? `${appt.test_type} Test`
          : appt.test_type == "HIV"
          ? `${appt.test_type} Test`
          : `${appt.test_type}`
      }
      location={appt.appt_location}
      date={appt.appt_date.slice(0, 10)}
      time={appt.appt_date.slice(11, 16)}
      confirmation={appt.isConfirmed}
      navigation={navigation}
    />
  ));

  //this is used to create a list of react components from a array of data
  // must have a unique key identifier or a warning will be thrown
  const futureapptslist = futureAppts.map((appt) => (
    <ApptEvent
      key={appt.appt_id}
      apptid={appt.appt_id}
      title={
        appt.test_type == "STI"
          ? `${appt.test_type} Test`
          : appt.test_type == "HIV"
          ? `${appt.test_type} Test`
          : `${appt.test_type}`
      }
      location={appt.appt_location}
      date={appt.appt_date.slice(0, 10)}
      time={appt.appt_date.slice(11, 16)}
      confirmation={appt.isConfirmed}
      navigation={navigation}
    />
  ));

  return (
    <ImageBackground
      source={require("../assets/textured-background.webp")}
      resizeMode="cover"
      style={styles.image}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ActivityIndicator
          visible={getpastApptsApi.loading || getfutureApptsApi.loading}
        />
        <View style={styles.idContainer}>
          <Text style={styles.id}>Five Spot ID: {user}</Text>
          <Text style={styles.id}>{userEmail}</Text>
        </View>

        <View style={styles.titleheader}>
          <Text style={styles.redtext}>Upcoming Appointments</Text>
        </View>

        {futureapptslist.length > 0 ? ( // If there are no appointments, it will show "no upcoming appts"
          futureapptslist
        ) : (
          <View style={styles.noAppts}>
            <Text style={styles.noApptsText}>No upcoming appointments</Text>
          </View>
        )}

        <View>
          {getfutureApptsApi.error && (
            <>
              <Text>Couldn't retrieve the appointments.</Text>
              <Button title="Retry" onPress={getfutureApptsApi.request} />
            </>
          )}
        </View>

        <View style={styles.titleheader}>
          <Text style={styles.redtext}>Appointment History</Text>
        </View>

        {pastapptslist.length > 0 ? (
          pastapptslist
        ) : (
          <View style={styles.noAppts}>
            <Text style={styles.noApptsText}>No past appointments</Text>
          </View>
        )}

        <View style={styles.btnContainer}>
          <Button
            color={colors.primary}
            title="Log Out"
            onPress={() => {
              auth.logOut();
            }}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = {
  image: {
    flex: 1,
  },
  redtext: {
    height: 36,
    fontFamily: Platform.OS === "android" ? "serif" : "Avenir",
    fontSize: 26,
    textAlign: "left",
    color: "#B70F0A",
  },
  blacktext: {
    height: 36,
    fontFamily: Platform.OS === "android" ? "serif" : "Avenir",
    fontSize: 26,
    textAlign: "center",
  },
  btnContainer: {
    marginTop: "15%",
    marginBottom: 25,
  },
  titleheader: {
    width: "100%",
    marginTop: 20,
  },
  noAppts: {
    textAlign: "center",
    backgroundColor: colors.grey,
    borderRadius: 10,
    padding: 5,
    marginTop: 10,
  },
  noApptsText: {
    textAlign: "center",
  },
  container: {
    marginTop: "25%",
    marginLeft: 25,
    marginRight: 25,
  },
  idContainer: {
    backgroundColor: colors.grey,
    borderRadius: 10,
    marginTop: 20,
    width: "75%",
    justifySelf: "center",
    alignSelf: "center",
  },
  id: {
    height: 30,
    fontFamily: Platform.OS === "android" ? "serif" : "Avenir",
    fontSize: 20,
    textAlign: "center",
  },
};
