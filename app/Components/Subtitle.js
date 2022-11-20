import React from 'react';
import { StyleSheet } from 'react-native';
import Text from '../Components/Text';
import colors from '../config/colors';

function Subtitle({ subTitle, style }) {
    return (
        <Text style={[styles.subTitle, style]}>{subTitle}</Text>
    );

}

const styles = StyleSheet.create({
    subTitle: {
        color: colors.primary,
        marginTop: 50,
        fontSize: 20,
        fontWeight: '700'
    },
})

export default Subtitle;