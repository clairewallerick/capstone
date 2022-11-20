import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import PopUp from "../Components/PopUp";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details, link }) => (
  <PopUp title={name} link={link}>
    {details}
  </PopUp>
);

// the filter
const List = (props) => {
  let newData;
  if (props.searchPhrase === "") {
    //when no input in search, show 4 favorites (identified by the first four IDs)
    newData = props.data.filter((x) => x.id <= props.count);
  } else {
    //if there is a search, filter out the data for starting with letter so that it doesn't have to skip over unnecessary data in the render
    newData = props.data.filter((x) =>
      x.name
        .toUpperCase()
        .startsWith(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    );
  }
  //for some reason the component came this way but you call renderItem which renders the item component up above which renders popup, didn't cause problems but could consider simplifying
  const renderItem = ({ item }) => {
    return <Item name={item.name} details={item.details} link={item.link} />;
  };

  return (
    <View
      style={[props.style, styles.list__container]}
      onStartShouldSetResponder={() => {
        if (props.setClicked != null) {
          props.setClicked(false);
        }
      }}
    >
      <View style={{ alignItems: "center", justifyContent: "center", }}>
        <FlatList
          data={newData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
          numColumns={2}
          scrollEnabled={props.setScroll}
        />
      </View>
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    width: "100%",
  },
});
