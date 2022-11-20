import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import colors from "../config/colors";

function PageTitle({children}) {
    return (
        <View >
            <Text style={styles.text}>{children}</Text>
            <View style={styles.rectangle} ></View>
        </View>
    );
}

const styles = StyleSheet.create({
    rectangle: {
        width: 175,
	    height: 7,
	    backgroundColor: colors.primary,
        borderRadius: 25,
    },
    text: {
        width: 500,
        height: 36,
        fontFamily: Platform.OS === 'android' ? 'serif' : 'Avenir',
        fontSize: 26,
        textAlign: 'left',
    },
    //titleContainer: {
      //  position: 'absolute',
        //top: 65,
        //marginLeft: 55
    //}
})

export default PageTitle;