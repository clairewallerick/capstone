import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import List from "../Components/List";

function FullEducationScreen({ navigation, route }) {
  const { data } = route.params; //on SearchEducationScreen, navigation to this page passes the education data to be seen here as well
  let emptySearchPhrase = ""; //forces List component to have a blank search phrase since that component is expecting it as a prop and don't need it for this screen

  const isFocused = useIsFocused();
  isFocused
    ? useEffect(() => {
        navigation.getParent().setOptions({ headerShown: false });
      })
    : useEffect(() => {
        navigation.getParent().setOptions({ headerShown: true });
      });
  //^^connects page to parent page (user profile) that links to this one

  return (
    <ImageBackground
      source={require("../assets/textured-background.webp")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        {!data ? (
          <ActivityIndicator size="large" />
        ) : (
          // used the same setup as on the search education screen despite not really needing any of the same functionality cause made life easier when rending the cards, didn't have to have 2 different systems
          // List component renders the flatlist so this just passes it information for scrolling and searching, I AM SORRY THIS IS JANKY
          <List
            searchPhrase={emptySearchPhrase}
            data={data}
            style={{ top: 125 }}
            setScroll={true} //makes it so that this screen does scroll cause I want it to
            count={data.length} //allows me to control how many show up on the page so I can reuse List for the search screen
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 175,
  },
  image: {
    flex: 1,
  },
  searchBar: {
    top: 165,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff",
    borderTopColor: "#fff",
    borderBottomColor: "#fff",
    //borderRadius: 17
  },
  textBar: {
    borderRadius: 25,
  },
});

export default FullEducationScreen;
