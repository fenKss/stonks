import React from "react";
import {View, Text, StyleSheet} from "react-native";

const Stonk = (props: any) => {
    // @ts-ignore
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{props.date}</Text>
            <Text style={styles.summ}>{props.summ}</Text>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    date: {
        fontSize: 10,
        color: "grey"
    },
    summ: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    }
});

export default Stonk;