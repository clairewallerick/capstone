import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from '../Components/Text';
import colors from '../config/colors';

function UserInfo({ Fname, LName, address, email, phone_num, b_date }) {
    return (
        <>
            <View style={styles.container}>
                    <Text style={styles.title}>Name</Text>
                    <Text style={styles.location}>{Fname+ ' ' + LName}</Text>
                    <Text style={styles.title}>Birth Date</Text>
                    <Text style={styles.date}>{b_date}</Text>
                    <Text style={styles.title}>Email</Text>
                    <Text style={styles.location}>{email}</Text>
                    <Text style={styles.title}>Address</Text>
                    <Text style={styles.location}>{address}</Text>
                    <Text style={styles.title}>phone_num</Text>
                    <Text style={styles.location}>{phone_num}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.grey,
        marginTop: 25,
        borderRadius: 10,
        padding: 15,
        // alignItems: 'center'
    },
    titleDateContainer: {
        flexDirection: 'row',
    },
    date: {
        marginRight: 0,
        marginLeft: 'auto'
    },
    title: {
        fontSize: 20,
        color: colors.primary,
        fontWeight: '500',
    },
    location: {
        fontWeight: '500'
    },
    locationContainer: {
        flexDirection: 'row'
    },
})

export default UserInfo;
