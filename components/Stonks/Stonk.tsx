import React from "react";
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {StonkType} from "../../types";
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
    const timeConverter = (UNIX_timestamp: number) => {
        const a = new Date(UNIX_timestamp * 1000),
            months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            year = a.getFullYear(),
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes(),
            sec = a.getSeconds();
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    }
    return (
        <TouchableWithoutFeedback onLongPress={() => {
            onHoldHandler(stonk);
        }}>
            <View style={styles.container}>
                <View style={styles.left}>
                    <Text style={styles.date}>{timeConverter(+stonk.created_at)}</Text>
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
        // marginRight: 22,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#fff",
        marginRight: 20,
    },
    img: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    description: {
        fontSize: 8,
        color: "#fff",

    }
});

export default Stonk;