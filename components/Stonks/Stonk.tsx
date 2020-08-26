import React from "react";
import {View, Text, StyleSheet} from "react-native";
import {StonkType} from "../../types";

const Stonk = (props: StonkType) => {
    return (
        <View style={styles.container}>
            <Text style={styles.date}>{props.created_at}</Text>
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