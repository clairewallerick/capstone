import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";

import ActivityIndicator from "../Components/ActivityIndicator";
import Button from "../Components/Button";
import colors from "../config/colors";
import Event from "../Components/Event";
import Text from "../Components/Text";
import useApi from "../hooks/useApi";
import eventsApi from "../api/events";
import factsApi from "../api/facts";
import FactCard from "../Components/FactCard";
import Subtitle from "../Components/Subtitle";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function HomeScreen({ navigation }) {
  // const [refreshing, setRefreshing] = useState(false);

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   wait(1000).then(async () => {
  //     var getEventsApi = useApi(eventsApi.getEvents);
  //     var getFactsApi = useApi(factsApi.getFacts);
  //     var events = getEventsApi.data;
  //     var facts = getFactsApi.data;
  //     setRefreshing(false);
  //   });
  // }, []);

  const getEventsApi = useApi(eventsApi.getEvents);
  const getFactsApi = useApi(factsApi.getFacts);
  const events = getEventsApi.data;
  const facts = getFactsApi.data;

  const eventslist = events.map((event, index) => (
    <Event
      key={event.id}
      title={event.event_name}
      location={event.location}
      date={event.date.slice(0, 10)}
      time={event.date.slice(11, 16)}
      description={event.description}
      spot={index}
    />
  ));
  const factslist = facts.map((item, index) => (
    <FactCard
      key={item.id}
      fact={item.fact}
      date={item.last_updated.slice(0, 10)}
      spot={index}
    />
  ));

  useEffect(() => {
    getEventsApi.request();
    getFactsApi.request();
  }, []);

  return (
    <>
      <ImageBackground
        source={require("../assets/textured-background.webp")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView
          style={{ top: "10%", margin: "5%" }}
          showsVerticalScrollIndicator={false}
          /*refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }*/
        >
          <ActivityIndicator visible={getEventsApi.loading} />
          <View style={styles.body}>
            {getEventsApi.error && (
              <>
                <Text>Couldn't retrieve the events.</Text>
                <Button title="Retry" onPress={getEventsApi.request} />
              </>
            )}
            {getFactsApi.error && (
              <>
                <Text>Couldn't retrieve the facts.</Text>
                <Button title="Retry" onPress={getFactsApi.request} />
              </>
            )}
          </View>
          <View>
            <Button
              title="Book a Test!"
              style={styles.testButton}
              onPress={() => navigation.navigate("Book an Appointment")}
            />
            <Subtitle subTitle={"Upcoming Events"} />
            {events.length == 0 ? (
              <Text style={styles.noEvents}>No upcoming events</Text>
            ) : (
              eventslist
            )}
            <Subtitle subTitle={"Just The Tips"} />
            {facts.length == 0 ? (
              <Text style={styles.noEvents}>No facts to display</Text>
            ) : (
              factslist
            )}

            <Subtitle subTitle={"About Us"} />
            <View style={styles.aboutContainer}>
              <Text>
                Five Horizons Health Services (FHHS) is a nonprofit
                community-based organization that provides services to West
                Alabama and East Mississippi. Founded in 1988 as West Alabama
                AIDS Outreach (WAAO), the agency’s original mission was to
                provide HIV-related outreach and prevention services to West
                Alabama. Since that time, the agency has expanded to include a
                variety of services for populations in need of specialized or
                general care.
              </Text>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    backgroundColor: colors.white,
  },
  headertextwrapper: {
    width: "90%",
    alignItems: "center",
  },
  stuffText: {
    backgroundColor: colors.grey,
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    marginVertical: 25,
    justifyContent: "center",
  },
  noEvents: {
    textAlign: "center",
    backgroundColor: colors.grey,
    padding: 5,
    marginTop: 20,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    flex: 1,
  },
  container: {
    marginTop: "7%",
    marginLeft: 25,
    marginRight: 25,
  },
  testButton: {
    //paddingLeft: 15,
    //padding: 25,
  },
  textContainer: {
    flexDirection: "row",
    width: "90%",
  },
  aboutContainer: {
    marginBottom: "35%",
    marginTop: "5%",
    backgroundColor: colors.light,
    padding: 15,
    borderRadius: 10,
  },
});

export default HomeScreen;
