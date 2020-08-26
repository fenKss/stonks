import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {StonkType} from "../../types";


type Props = {
    stonk: StonkType,
    onHoldHandler: (stonk: StonkType) => void;
}
const Stonk = (props: Props) => {
    const {onHoldHandler, stonk} = props;
    return (
        <TouchableWithoutFeedback  onLongPress={() => {
            onHoldHandler(stonk);
        }} >
            <View style={styles.container} >
                <Text style={styles.date}>{stonk.created_at}</Text>
                <Text style={styles.summ}>{stonk.summ}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        margin:10
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