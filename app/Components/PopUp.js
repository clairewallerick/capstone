import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../config/colors";

const App = ({ title, link, children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        {/* inside modal */}
        <View style={styles.modalView}>
          <Text style={styles.modalTitleText}>{title}</Text>
          <Text style={styles.modalText}>{children}</Text>
          <Text
            style={styles.modalLinkText}
            onPress={() => {
              Linking.openURL(link);
            }}
          >
            {link}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={[styles.closeTextStyle, styles.closeText]}>Close</Text>
          </Pressable>
        </View>
      </Modal>
      {/* outside box */}
      {/* if do not like the stacked boxes, change the margin on the button below and get rid of color on view */}
      <TouchableOpacity
        style={styles.buttonOpen}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.openTextStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    justifyContent: "center",
    alignContent: "center",
    // flexDirection: "column",
  },
  modalView: {
    margin: "5%",
    height: "65%",
    top: "10%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    height: 125,
    // width: 150,
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 2.5,
    borderColor: colors.primary,
    margin: 10, //change this number for the offset
  },
  buttonClose: {
    backgroundColor: colors.primary, //this is the dark red color close button inside the modal
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    height: 40,
    width: 80,
  },
  openTextStyle: {
    fontWeight: "500",
    fontSize: 23,
    fontFamily: Platform.OS === "android" ? "serif" : "Avenir",
    // flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.black,
  },
  closeTextStyle: {
    fontWeight: "500",
    fontSize: 23,
    fontFamily: Platform.OS === "android" ? "serif" : "Avenir",
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    color: colors.white,
  },
  closeText: {
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  backgroundButton: {
    // borderRadius: 15,
    // height: 110,
    // width: 160,
    margin: 5,
    // backgroundColor: colors.primary,
  },
  modalTitleText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.primary,
    fontWeight: "bold",
  },
  modalLinkText: {
    marginBottom: 15,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default App;
