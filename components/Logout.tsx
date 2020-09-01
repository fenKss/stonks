import React from "react";
import {Text, View} from "./Themed";
import {StyleSheet} from "react-native";
import {UserService} from "../ts/UserService";

// @ts-ignore
export default function Logout({navigation}) {
    const exit = () => {
        const service = new UserService();
        service.logout().then(() => {
            navigation.replace('Auth');
        });

    }
    return (
        <View style={styles.container}>
            <Text style={styles.text} onPress={exit}>Logout</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontSize: 15,
        color: '#fff',
    },
    container: {
        position: "absolute",
        right: 10,
        top: 10,
        zIndex:999
    }
});