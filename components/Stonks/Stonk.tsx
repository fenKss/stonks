import React from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {StonkType} from "../../ts/types";
// @ts-ignore
import stonkImg from "../../assets/images/stonks.png";
// @ts-ignore
import notStonkImg from "../../assets/images/notStonks.png";

type Props = {
    stonk: StonkType,
    onHoldHandler: (stonk: StonkType) => void;
}
const Stonk = (props: Props) => {
    const {onHoldHandler, stonk} = props;
    return (
        <TouchableWithoutFeedback onLongPress={() => {
            onHoldHandler(stonk);
        }}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.date}>{stonk.created_at}</Text>
                    <Text style={{...styles.summ, color: stonk.summ >= 0 ? "#24ff00" : "#ff0000"}}>{stonk.summ}</Text>
                </View>
                <View style={styles.right}>
                    <View>
                        <Text style={styles.title}>{stonk.title}</Text>
                        <Text style={styles.description}>{stonk.description}</Text>
                    </View>
                    <Image style={styles.img} source={stonk.summ >= 0 ? stonkImg : notStonkImg}/>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};
const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 10,
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "row",
    },
    date: {
        fontSize: 12,
        color: "grey"
    },
    summ: {
        fontSize: 25,
        fontWeight: 'bold',

    },
    left: {
        flex: 1,
        alignItems: "flex-start",
        flexDirection: "column",
        justifyContent: "center",
        marginRight: 62,
    },
    right: {
        flex: 1,
        justifyContent: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 22,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginRight: 20,
        textAlign:"right",
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    description: {
        fontSize: 8,
        color: "#fff",
        textAlign:"right",

    }
});

export default Stonk;